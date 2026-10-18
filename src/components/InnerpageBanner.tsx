"use client";
import React from "react";


interface InnerpageBannerProps {
  title: string;
}

const InnerpageBanner: React.FC<InnerpageBannerProps> = ({
  title,
}) => {
  return (
    <section className="innerbannersection mb-5">
      <div className="container">
        <h1 className="p-0 m-0">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default InnerpageBanner;