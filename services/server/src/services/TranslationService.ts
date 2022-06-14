import { v2 } from "@google-cloud/translate";
import { Translate as TranslateClient } from "@google-cloud/translate/build/src/v2";
import he from "he";
import { Config } from "../config/default";
import { inject, singleton } from "tsyringe";
import { request } from "undici";

const { Translate } = v2;

const escapeText = (text: string) =>
  text.replace(/((:|@)\[.*?\]\(.*?\))/gm, '<span translate="no">$1</span>');

const unescapeText = (text: string) =>
  text.replace(/<\/?span(\stranslate="no")?>/gm, "");

/**
 * Translate text using cloud services
 */
@singleton()
export default class TranslationService {
  private readonly google?: TranslateClient;
  private readonly deeplApi?: string;

  constructor(@inject("Config") private readonly config: Config) {
    if (config.translationServices.google?.apiKey) {
      this.google = new Translate({
        key: config.translationServices.google.apiKey,
      });
    }
    this.deeplApi = this.config.translationServices.deepl?.apiKey;
  }

  private async _deeplTranslate(opt: {
    text: string;
    sourceLanguage?: string;
    targetLanguage: string;
  }): Promise<string | null> {
    const text = escapeText(opt.text);

    const subDomain = this.config.translationServices.deepl?.useFreeApi
      ? "api-free"
      : "api";
    const res = await request(`https://${subDomain}.deepl.com/v2/translate`, {
      body: `auth_key=${this.deeplApi}&text=${encodeURIComponent(
        text
      )}&target_lang=${opt.targetLanguage.toUpperCase()}&tag_handling=xml&ignore_tags=span`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
    const data: any = await res.body.json();
    if (!data?.translations?.[0]?.text) {
      throw data;
    }
    return unescapeText(data.translations[0].text);
  }

  private async _googleTranslate(opt: {
    text: string;
    sourceLanguage?: string;
    targetLanguage: string;
  }): Promise<string | null> {
    const { text, sourceLanguage, targetLanguage } = opt;
    if (this.google) {
      const [translation] = await this.google.translate(escapeText(text), {
        from: sourceLanguage?.split("-")[0].toLowerCase(),
        to: targetLanguage.split("-")[0].toLowerCase(),
        format: "html",
      });
      return he.decode(unescapeText(translation));
    }
    return null;
  }

  /**
   * Return true if deepl is available and can translate into the choosen language
   */
  private isDeeplAvailableForLanguage = (targetLanguage: string) => {
    return (
      !!this.deeplApi &&
      (this.config.translationServices.deepl?.languages || []).includes(
        targetLanguage.toLowerCase()
      )
    );
  };

  /**
   * Return true if google is available and can translate into the choosen language
   */
  private isGoogleAvailableForLanguage = (_targetLanguage: string) => {
    return !!this.google;
  };

  /**
   * Translate a text into the target language using the optimal service
   */
  async translate(opt: {
    text: string;
    sourceLanguage?: string;
    targetLanguage: string;
  }): Promise<string | null> {
    if (this.isDeeplAvailableForLanguage(opt.targetLanguage)) {
      try {
        const translation = await this._deeplTranslate(opt);
        if (translation) {
          return translation;
        }
      } catch (e) {
        console.warn(e as Error, `Deepl translation failed. Trying google`);
      }
    }
    if (this.isGoogleAvailableForLanguage(opt.targetLanguage)) {
      return this._googleTranslate(opt);
    }
    return null;
  }
}
