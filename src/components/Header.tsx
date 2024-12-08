import React from "react";

const Header = () => {
  return (
    <div className="flex flex-col max-w-[70%] items-center">
      <h1 className="text-36 text-white font-bold text-center">
        Welcome To<span className="text-brand-green"> Geo Wizard</span>
      </h1>
      <p className="text-18 text-brand-grey text-center">
        We&apos;re here to help you streamline your geographic data needs in just a few clicks. Fill in the form below,
        upload your Area of Interest, and let us handle the rest. It&apos;s quick, simple, and designed for your ease!
      </p>
    </div>
  );
};

export default Header;
