"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import { contactSchema, ContactFormData } from "@/data/contactSchema";

const ContactForm = () => {
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSuccess("Your message has been submitted successfully.");
    reset();

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <section className="contact-form-section">
      <div className="contact-form-wrapper">
        <div className="heading text-white">Get in Touch With Us</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <input
                type="text"
                placeholder="First Name"
                className={`form-control custom-input ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                {...register("firstName")}
              />

              {errors.firstName && (
                <p className="error-text">{errors.firstName.message}</p>
              )}
            </div>

            <div className="col-lg-6 mb-4">
              <input
                type="text"
                placeholder="Last Name"
                className={`form-control custom-input ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                {...register("lastName")}
              />

              {errors.lastName && (
                <p className="error-text">{errors.lastName.message}</p>
              )}
            </div>

            <div className="col-lg-6 mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className={`form-control custom-input ${
                  errors.email ? "is-invalid" : ""
                }`}
                {...register("email")}
              />

              {errors.email && (
                <p className="error-text">{errors.email.message}</p>
              )}
            </div>

            <div className="col-lg-6 mb-4">
              <input
                type="text"
                placeholder="Mobile Number"
                className={`form-control custom-input ${
                  errors.mobile ? "is-invalid" : ""
                }`}
                {...register("mobile")}
              />

              {errors.mobile && (
                <p className="error-text">{errors.mobile.message}</p>
              )}
            </div>

            <div className="col-12 mb-4">
              <input
                type="text"
                placeholder="Subject"
                className={`form-control custom-input ${
                  errors.subject ? "is-invalid" : ""
                }`}
                {...register("subject")}
              />

              {errors.subject && (
                <p className="error-text">{errors.subject.message}</p>
              )}
            </div>

            <div className="col-12 mb-4">
              <textarea
                rows={5}
                placeholder="Your Message"
                className={`form-control custom-textarea ${
                  errors.message ? "is-invalid" : ""
                }`}
                {...register("message")}
              ></textarea>

              {errors.message && (
                <p className="error-text">{errors.message.message}</p>
              )}
            </div>

            <div className="col-12">
              {success && <div className="alert alert-success">{success}</div>}

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit
                    <svg
                      width="14"
                      height="11"
                      viewBox="0 0 14 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.625 10.5L13.5 5.5L8.625 0.5M13.5 5.5L4.96875 5.5M0.5 5.5L2.53125 5.5"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
