
import React, { useState, useEffect } from "react";
import useCountries from "../api/client/getCountries";
import { useForm } from "react-hook-form";

function DebounceForm() {

  // React Hook Form
  const {register,handleSubmit,setValue,watch, formState: { errors }} = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      skills: [],
      country: "",
      message: ""
    }
  });

  
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  // Watch Values
  const selectedSkills = watch("skills");
  const selectedGender = watch("gender");
  const selectedCountry = watch("country");

  // Countries API
  const {
    data: countries = [],isLoading,isError, error} = useCountries();

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Filter Countries
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // Select Country
  const handleCountry = (country) => {
    setValue("country", country);
    setSearch(country);
    setDebouncedSearch(country);
    setSubmittedData(null);
  };

  // Submit Form
  const onSubmit = (data) => {
    setSubmittedData(data);
    console.log(data);
  };

  // Styling
  const inputStyle =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 placeholder:text-slate-400";

  const labelStyle = "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">

      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 px-6 py-9 text-white sm:px-10">

          <div className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wider">
            REGISTRATION PORTAL
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create Your Profile
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-indigo-100">
            Fill in your personal information and preferences to complete your
            registration.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 p-6 sm:p-10"
        >

          {/* Personal Information */}
          <section>

            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-800">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter your basic details below.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Name */}
              <div>
                <label className={labelStyle}>Full Name</label>

                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required"
                  })}
                  placeholder="Enter your full name"
                  className={inputStyle}
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className={labelStyle}>Email Address</label>

                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required"
                  })}
                  placeholder="example@gmail.com"
                  className={inputStyle}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className={labelStyle}>Phone Number</label>

                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required"
                  })}
                  placeholder="+92 300 1234567"
                  className={inputStyle}
                />

                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Country Search */}
              <div className="relative">

                <label className={labelStyle}>Country Search</label>

                {/* Actual Country Field */}
                <input
                  type="hidden"
                  {...register("country", {
                    required: "Please select a country"
                  })}
                />

                {/* Search Input */}
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setValue("country", "");
                    setSubmittedData(null);
                  }}
                  placeholder="Search your country..."
                  className={inputStyle}
                />

                {search && search !== selectedCountry && (
                  <div className="absolute z-20 mt-2 max-h-48 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg">

                    {isLoading ? (
                      <p className="p-3 text-sm text-slate-500">
                        Loading countries...
                      </p>
                    ) : isError ? (
                      <p className="p-3 text-sm text-red-500">
                        {error?.message || "Failed to load countries!"}
                      </p>
                    ) : filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <button
                          type="button"
                          key={country.slug}
                          onClick={() => handleCountry(country.name)}
                          className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                        >
                          {country.flag} {country.name}
                        </button>
                      ))
                    ) : (
                      <p className="p-3 text-sm text-slate-500">
                        No country found for "{debouncedSearch}"
                      </p>
                    )}

                  </div>
                )}

                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}

              </div>

            </div>
          </section>

          <div className="border-t border-slate-100"></div>

          {/* Gender */}
          <section>

            <h2 className="mb-2 text-lg font-bold text-slate-800">
              Gender
            </h2>

            <p className="mb-4 text-sm text-slate-500">
              Select one option.
            </p>

            <div className="flex flex-wrap gap-3">

              {["Male", "Female", "Other"].map((gender) => (

                <label
                  key={gender}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition ${
                    selectedGender === gender
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-300"
                  }`}
                >

                  <input
                    type="radio"
                    value={gender}
                    {...register("gender", {
                      required: "Please select your gender"
                    })}
                    className="accent-indigo-600"
                  />

                  {gender}

                </label>

              ))}

            </div>

            {errors.gender && (
              <p className="mt-2 text-sm text-red-500">
                {errors.gender.message}
              </p>
            )}

          </section>

          <div className="border-t border-slate-100"></div>

          {/* Skills */}
          <section>

            <h2 className="mb-2 text-lg font-bold text-slate-800">
              Your Skills
            </h2>

            <p className="mb-4 text-sm text-slate-500">
              Select all skills that apply to you.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

              {[
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Node.js",
                "Tailwind CSS"
              ].map((skill) => (

                <label
                  key={skill}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm font-medium transition ${
                    selectedSkills.includes(skill)
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-300"
                  }`}
                >

                  <input
                    type="checkbox"
                    value={skill}
                    {...register("skills", {
                      validate: (value) =>
                        value.length > 0 || "Select at least one skill"
                    })}
                  />

                  {skill}

                </label>

              ))}

            </div>

            {errors.skills && (
              <p className="mt-2 text-sm text-red-500">
                {errors.skills.message}
              </p>
            )}

          </section>

          <div className="border-t border-slate-100"></div>

          {/* Message */}
          <section>

            <h2 className="mb-4 text-lg font-bold text-slate-800">
              Additional Information
            </h2>

            <label className={labelStyle}>Your Message</label>

            <textarea
              {...register("message")}
              placeholder="Tell us something about yourself..."
              rows="4"
              className={`${inputStyle} resize-none`}
            />

          </section>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-300 active:translate-y-0"
          >
            Submit Registration →
          </button>

        </form>

        {/* Submitted Data */}
        {submittedData && (

          <div className="border-t border-slate-100 bg-slate-50 p-6 sm:p-10">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-xl text-green-600">
                ✓
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Registration Successful!
                </h2>

                <p className="text-sm text-slate-500">
                  Here is your submitted information.
                </p>
              </div>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {[
                  ["Full Name", submittedData.name],
                  ["Email", submittedData.email],
                  ["Phone", submittedData.phone],
                  ["Gender", submittedData.gender],
                  ["Country", submittedData.country],
                  ["Skills", submittedData.skills.join(", ") || "None"],
                  ["Message", submittedData.message || "No message"]
                ].map(([label, value]) => (

                  <div key={label}>

                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {label}
                    </p>

                    <p className="break-words text-sm font-semibold text-slate-800">
                      {value}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        )}

      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        Registration Portal · Built with React & Tailwind CSS
      </p>

    </div>
  );
}

export default DebounceForm;
