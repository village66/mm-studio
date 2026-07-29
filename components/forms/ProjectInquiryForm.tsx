"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClassName =
  "mt-3 w-full rounded-sm border border-[#d8d0c4] bg-white px-4 py-3.5 text-[15px] font-light text-[#26231f] outline-none transition placeholder:text-neutral-400 focus:border-[#aa8b60] focus:ring-2 focus:ring-[#aa8b60]/15";

const optionClassName =
  "flex cursor-pointer items-start gap-3 rounded-sm border border-[#ddd6cc] bg-white px-4 py-3.5 text-[14px] font-light leading-6 text-[#45413c] transition hover:border-[#bda57f] has-[:checked]:border-[#a98a60] has-[:checked]:bg-[#f7f2ea]";

const questions = [
  {
    value: "住宅空間",
    label: "住宅空間",
  },
  {
    value: "商業空間",
    label: "商業空間",
  },
  {
    value: "辦公空間",
    label: "辦公空間",
  },
  {
    value: "其他",
    label: "其他",
  },
];

export default function ProjectInquiryForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitState === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const honeypot = formData.get("_gotcha");
    const elapsed = startedAt.current ? Date.now() - startedAt.current : 0;

    if (honeypot || elapsed < 3000) {
      setSubmitState("error");
      setErrorMessage("送出速度過快，請稍候幾秒後再試一次。");
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    if (!endpoint) {
      setSubmitState("error");
      setErrorMessage("表單服務尚未完成設定，請先以電子郵件與我們聯絡。");
      return;
    }

    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Formspree submission failed");
      }

      form.reset();
      startedAt.current = Date.now();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMessage("目前無法送出，請稍後再試，或直接寄信與我們聯絡。");
    }
  }

  function resetForm() {
    setSubmitState("idle");
    setErrorMessage("");
    startedAt.current = Date.now();
  }

  if (submitState === "success") {
    return (
      <div
        className="flex min-h-[420px] flex-col items-center justify-center rounded-sm border border-[#ded6ca] bg-white px-6 py-16 text-center shadow-[0_24px_70px_rgba(68,57,43,0.06)]"
        role="status"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#bda57f] text-2xl text-[#9a7b54]">
          ✓
        </span>
        <p className="mt-7 text-[10px] uppercase tracking-[0.34em] text-[#a4865d]">
          Inquiry Received
        </p>
        <h2 className="mt-4 text-[28px] font-extralight tracking-[0.06em] text-[#26231f] sm:text-[34px]">
          感謝您的來信
        </h2>
        <p className="mt-5 max-w-md text-[14px] font-light leading-7 text-neutral-600">
          我們已收到您的初步需求，將在閱讀資料後儘快與您聯繫。
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-8 rounded-full border border-[#c9b08a] px-7 py-3 text-[11px] tracking-[0.2em] text-[#53493c] transition hover:bg-[#f6f1e9]"
        >
          填寫另一份需求
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-[#ded6ca] bg-white p-5 shadow-[0_24px_70px_rgba(68,57,43,0.06)] sm:p-8 lg:p-10"
    >
      <input type="hidden" name="_subject" value="MM Studio｜新的專案初步評估" />

      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company-website">公司網站</label>
        <input
          id="company-website"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-9 sm:gap-10">
        <fieldset>
          <legend className="text-[15px] font-normal tracking-[0.04em] text-[#2f2b26]">
            <span className="mr-3 text-[11px] text-[#a4865d]">01</span>
            您的姓名
          </legend>
          <input
            className={inputClassName}
            type="text"
            name="姓名"
            autoComplete="name"
            placeholder="請輸入您的姓名"
            maxLength={60}
            required
          />
        </fieldset>

        <fieldset>
          <legend className="text-[15px] font-normal tracking-[0.04em] text-[#2f2b26]">
            <span className="mr-3 text-[11px] text-[#a4865d]">02</span>
            聯絡方式
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input
              className="w-full rounded-sm border border-[#d8d0c4] bg-white px-4 py-3.5 text-[15px] font-light text-[#26231f] outline-none transition placeholder:text-neutral-400 focus:border-[#aa8b60] focus:ring-2 focus:ring-[#aa8b60]/15"
              type="email"
              name="電子信箱"
              autoComplete="email"
              placeholder="電子信箱"
              maxLength={120}
              required
            />
            <input
              className="w-full rounded-sm border border-[#d8d0c4] bg-white px-4 py-3.5 text-[15px] font-light text-[#26231f] outline-none transition placeholder:text-neutral-400 focus:border-[#aa8b60] focus:ring-2 focus:ring-[#aa8b60]/15"
              type="tel"
              name="聯絡電話"
              autoComplete="tel"
              inputMode="tel"
              placeholder="聯絡電話"
              maxLength={30}
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[15px] font-normal tracking-[0.04em] text-[#2f2b26]">
            <span className="mr-3 text-[11px] text-[#a4865d]">03</span>
            專案類型
          </legend>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {questions.map((option) => (
              <label key={option.value} className={optionClassName}>
                <input
                  type="radio"
                  name="專案類型"
                  value={option.value}
                  className="mt-1 accent-[#9a7b54]"
                  required
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[15px] font-normal tracking-[0.04em] text-[#2f2b26]">
            <span className="mr-3 text-[11px] text-[#a4865d]">04</span>
            專案地點
          </legend>
          <input
            className={inputClassName}
            type="text"
            name="專案地點"
            placeholder="例如：台中市西屯區"
            maxLength={100}
            required
          />
        </fieldset>

        <fieldset>
          <legend className="text-[15px] font-normal tracking-[0.04em] text-[#2f2b26]">
            <span className="mr-3 text-[11px] text-[#a4865d]">05</span>
            目前空間狀態
          </legend>
          <select className={inputClassName} name="空間狀態" defaultValue="" required>
            <option value="" disabled>
              請選擇
            </option>
            <option value="新成屋">新成屋</option>
            <option value="中古屋">中古屋</option>
            <option value="預售屋／尚未交屋">預售屋／尚未交屋</option>
            <option value="毛胚屋">毛胚屋</option>
            <option value="既有商業空間">既有商業空間</option>
            <option value="其他">其他</option>
          </select>
        </fieldset>

        <fieldset>
          <legend className="text-[15px] font-normal tracking-[0.04em] text-[#2f2b26]">
            <span className="mr-3 text-[11px] text-[#a4865d]">06</span>
            空間坪數
          </legend>
          <input
            className={inputClassName}
            type="text"
            name="空間坪數"
            placeholder="例如：約 35 坪"
            maxLength={50}
            required
          />
        </fieldset>

        <fieldset>
          <legend className="text-[15px] font-normal tracking-[0.04em] text-[#2f2b26]">
            <span className="mr-3 text-[11px] text-[#a4865d]">07</span>
            希望委託的服務
          </legend>
          <select className={inputClassName} name="委託服務" defaultValue="" required>
            <option value="" disabled>
              請選擇
            </option>
            <option value="完整設計與工程">完整設計與工程</option>
            <option value="室內設計規劃">室內設計規劃</option>
            <option value="格局與機能規劃">格局與機能規劃</option>
            <option value="軟裝與風格規劃">軟裝與風格規劃</option>
            <option value="尚未確定，希望討論">尚未確定，希望討論</option>
          </select>
        </fieldset>

        <fieldset>
          <legend className="text-[15px] font-normal tracking-[0.04em] text-[#2f2b26]">
            <span className="mr-3 text-[11px] text-[#a4865d]">08</span>
            預計投入的整體預算
          </legend>
          <select className={inputClassName} name="整體預算" defaultValue="" required>
            <option value="" disabled>
              請選擇較接近的範圍
            </option>
            <option value="100 萬元以下">100 萬元以下</option>
            <option value="100–200 萬元">100–200 萬元</option>
            <option value="200–350 萬元">200–350 萬元</option>
            <option value="350–500 萬元">350–500 萬元</option>
            <option value="500 萬元以上">500 萬元以上</option>
            <option value="尚未確定，希望討論">尚未確定，希望討論</option>
          </select>
          <p className="mt-2 text-[11px] font-light leading-5 text-neutral-400">
            包含設計、工程與主要設備的初步估算即可。
          </p>
        </fieldset>

        <fieldset>
          <legend className="text-[15px] font-normal tracking-[0.04em] text-[#2f2b26]">
            <span className="mr-3 text-[11px] text-[#a4865d]">09</span>
            預計開始時間
          </legend>
          <select className={inputClassName} name="預計開始時間" defaultValue="" required>
            <option value="" disabled>
              請選擇
            </option>
            <option value="1–3 個月內">1–3 個月內</option>
            <option value="3–6 個月內">3–6 個月內</option>
            <option value="6–12 個月內">6–12 個月內</option>
            <option value="一年後">一年後</option>
            <option value="尚未確定">尚未確定</option>
          </select>
        </fieldset>

        <fieldset>
          <legend className="text-[15px] font-normal tracking-[0.04em] text-[#2f2b26]">
            <span className="mr-3 text-[11px] text-[#a4865d]">10</span>
            想與我們分享的需求
          </legend>
          <textarea
            className={`${inputClassName} min-h-36 resize-y`}
            name="需求說明"
            placeholder="可簡單描述居住成員、喜歡的氛圍、必要機能或目前最在意的問題。"
            maxLength={1200}
            required
          />
        </fieldset>
      </div>

      <div className="mt-10 border-t border-[#e4ddd3] pt-7">
        <label className="flex items-start gap-3 text-[12px] font-light leading-6 text-neutral-500">
          <input
            type="checkbox"
            name="個資使用同意"
            value="同意"
            className="mt-1.5 accent-[#9a7b54]"
            required
          />
          <span>
            我同意 MM Studio 使用以上資料聯繫及進行專案初步評估。
          </span>
        </label>

        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="mt-6 inline-flex h-13 w-full items-center justify-center rounded-full border border-[#bca47e] bg-[#26231f] px-8 text-[12px] tracking-[0.24em] text-white transition duration-300 hover:bg-[#9a7b54] disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:min-w-[220px]"
        >
          {submitState === "submitting" ? "正在送出…" : "送出初步需求"}
        </button>

        <div className="mt-4 min-h-6" aria-live="polite">
          {submitState === "error" && (
            <p className="text-[12px] font-light leading-6 text-[#9d5b50]">
              {errorMessage}{" "}
              <a
                href="mailto:mm.interdesign@gmail.com"
                className="underline underline-offset-4"
              >
                mm.interdesign@gmail.com
              </a>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
