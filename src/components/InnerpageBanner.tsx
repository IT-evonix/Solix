"use client";
import React from "react";


interface InnerpageBannerProps {
  title: string;
}

const InnerpageBanner: React.FC<InnerpageBannerProps> = ({
  title,
}) => {
  return (
    <section className="innerbannersection mb-0">
      <div className="container" style={{position:"relative", zIndex:"5"}}>
        <div className="row">
          <div className="col-lg-12">
            <h1 className="p-0 m-0">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerpageBanner;