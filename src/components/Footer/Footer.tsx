import React, { useRef, useState, useEffect } from "react";

import { SITE_MAP, LEGAL_LINKS } from "@/constants";
import FooterBg from "@/assets/images/footer-bg.png";
import CertificateImage from "@/assets/images/certificate.png";
import AppStoreImage from "@/assets/images/button-app-store.png";
import GooglePlayImage from "@/assets/images/button-play-store.png";
import VietnameseFlag from "@/assets/images/vietnam-flag.png";
import ChevronUp from "@/assets/icons/chevron-up.svg";
import StrokeFooter from "@/assets/icons/stroke-footer.svg";

const Footer = () => {
  const TAX_CODE = "0305094228";
  const ADDRESS =
    "13 Nghia Thuc, Ward 05, District 5, Ho Chi Minh City, Viet Nam.";
  const PHONE = "0283 760 7607";
  const OPEN_HOURS = "09:00 - 22:00 from Mon - Fri";

  const languages = [
    {
      label: "Tiếng Việt",
      value: "vi",
      image: VietnameseFlag,
    },
    {
      label: "English",
      value: "en",
      image: VietnameseFlag,
    },
  ];

  const [currentLanguage, setCurrentLanguage] = useState("vi");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: "100%",
    left: "0",
    right: "auto",
    bottom: "auto",
  });
  const languageRef = useRef<HTMLDivElement>(null);

  const handleChangeLanguage = (language: string) => {
    setCurrentLanguage(language);
    setIsOpenDropdown(false);
  };

  const calculateDropdownPosition = () => {
    if (!languageRef.current) return;

    const rect = languageRef.current.getBoundingClientRect();
    const dropdownWidth = 200; // Estimated dropdown width
    const dropdownHeight = languages.length * 56 + 16; // Estimated dropdown height
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let position = {
      top: "100%",
      left: "0",
      right: "auto",
      bottom: "auto",
    };

    // Check space below
    if (rect.bottom + dropdownHeight <= viewport.height) {
      position.top = "100%";
      position.bottom = "auto";
    } else {
      // Not enough space below, show above
      position.top = "auto";
      position.bottom = "100%";
    }

    // Check space on the right
    if (rect.right + dropdownWidth <= viewport.width) {
      position.left = "0";
      position.right = "auto";
    } else if (rect.left - dropdownWidth >= 0) {
      // Not enough space on right, try left
      position.left = "auto";
      position.right = "0";
    } else {
      // Not enough space on either side, center it
      position.left = "50%";
      position.right = "auto";
    }

    setDropdownPosition(position);
  };

  useEffect(() => {
    if (isOpenDropdown) {
      calculateDropdownPosition();
      window.addEventListener("resize", calculateDropdownPosition);
      return () =>
        window.removeEventListener("resize", calculateDropdownPosition);
    }
  }, [isOpenDropdown]);

  return (
    <footer className="relative h-auto w-full py-9 lg:py-24">
      <img
        src={FooterBg}
        alt="Footer Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 container mx-auto">
        <div className="l flex items-start justify-between">
          {/* info */}
          <div className="flex flex-col items-start justify-between">
            <h3 className="font-primary mb-6 text-[18px] leading-7 font-semibold text-[#013065] lg:mb-8 lg:text-xl">
              Viet Hung Auto Production Trading Joint Stock Company
            </h3>

            <p className="font-primary text-sm text-[#637381] lg:text-base">
              Tax code: <span className="font-semibold">{TAX_CODE}</span>
            </p>
            <p className="font-primary mt-1.5 text-sm text-[#637381] lg:mt-3 lg:text-base">
              Address: <span className="font-semibold">{ADDRESS}</span>
            </p>
            <p className="font-primary mt-1.5 text-sm text-[#637381] lg:mt-3 lg:text-base">
              Phone number: <span className="font-semibold">{PHONE}</span>
            </p>
            <p className="font-primary mt-1.5 text-sm text-[#637381] lg:mt-3 lg:text-base">
              Open hours: <span className="font-semibold">{OPEN_HOURS}</span>
            </p>
            <img
              src={CertificateImage}
              alt="Certificate"
              className="mt-6 w-full max-w-[120px] md:max-w-[180px] lg:mt-8 lg:max-w-[230px]"
            />
          </div>

          {/* site map */}
          <div className="flex flex-col items-start justify-between">
            <h3 className="font-primary mb-6 text-xl leading-7 font-semibold text-[#013065] lg:mb-8 lg:text-2xl">
              Site Map
            </h3>

            <ul>
              {SITE_MAP.map((item) => (
                <li
                  key={item.label}
                  className="font-primary group mt-1.5 text-sm text-[#637381] first:mt-0 hover:font-semibold hover:text-[#1C252E] lg:mt-3 lg:text-base"
                >
                  <a
                    href={item.path}
                    className="flex items-center transition-colors duration-300 group-hover:gap-2"
                  >
                    <img
                      src={StrokeFooter}
                      alt=""
                      className="h-3 w-0 transition-all duration-300 group-hover:w-3"
                    />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* legal links */}
          <div className="flex flex-col items-start justify-between">
            <h3 className="font-primary mb-6 text-xl leading-7 font-semibold text-[#013065] lg:mb-8 lg:text-2xl">
              Legal Links
            </h3>
            <ul>
              {LEGAL_LINKS.map((item) => (
                <li
                  key={item.label}
                  className="font-primary group mt-1.5 text-sm text-[#637381] first:mt-0 hover:font-semibold hover:text-[#1C252E] lg:mt-3 lg:text-base"
                >
                  <a
                    href={item.path}
                    className="flex items-center transition-colors duration-300 group-hover:gap-2"
                  >
                    <img
                      src={StrokeFooter}
                      alt=""
                      className="h-3 w-0 transition-all duration-300 group-hover:w-3"
                    />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App */}
          <div className="flex flex-col items-start justify-between">
            <h3 className="font-primary mb-6 text-xl leading-7 font-semibold text-[#013065] lg:mb-8 lg:text-2xl">
              Download App
            </h3>
            <div className="flex flex-col items-center justify-between gap-3">
              <img
                src={GooglePlayImage}
                className="max-w-[120px] md:max-w-[180px] lg:max-w-[230px]"
                alt="Google Play"
              />
              <img
                src={AppStoreImage}
                className="max-w-[120px] md:max-w-[180px] lg:max-w-[230px]"
                alt="App Store"
              />

              {/* languages */}
              <div
                className="relative flex items-center justify-between gap-2 self-end"
                ref={languageRef}
              >
                <img
                  className="h-4 w-4 lg:h-9 lg:w-9"
                  src={
                    languages.find((item) => item.value === currentLanguage)
                      ?.image
                  }
                  alt={
                    languages.find((item) => item.value === currentLanguage)
                      ?.label ?? ""
                  }
                />

                <label className="text-sm font-medium uppercase">
                  {currentLanguage}
                </label>

                {/* open dropdown */}
                <button
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                >
                  <img
                    src={ChevronUp}
                    alt="Vietnamese"
                    className="h-2 w-2 rotate-180 lg:h-4 lg:w-4"
                  />
                </button>

                {/* Dropdown moved here */}
                <div
                  className={`absolute z-50 mt-2 min-w-[200px] rounded-lg border bg-white shadow-lg ${
                    isOpenDropdown ? "block" : "hidden"
                  }`}
                  style={{
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                    right: dropdownPosition.right,
                    bottom: dropdownPosition.bottom,
                    transform:
                      dropdownPosition.left === "50%"
                        ? "translateX(-50%)"
                        : undefined,
                  }}
                >
                  {languages.map((item) => (
                    <div
                      key={item.value}
                      className="flex cursor-pointer items-center gap-2 p-3 transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                      onClick={() => handleChangeLanguage(item.value)}
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        className="h-6 w-6"
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                      {currentLanguage === item.value && (
                        <span className="ml-auto text-blue-600">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
