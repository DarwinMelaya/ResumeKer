import React, { useState } from "react";
import ResumePreview from "../components/Home/ResumePreview";
import { motion } from "framer-motion";
import { HiOutlineDocumentAdd, HiOutlinePhotograph } from "react-icons/hi";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const STEPS = {
  PERSONAL: 0,
  OBJECTIVE: 1,
  EDUCATION: 2,
  EXPERIENCE: 3,
  SKILLS: 4,
  REFERENCES: 5,
  REVIEW: 6,
};

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="relative mb-12">
    <div className="flex items-center justify-between mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div
            className={`
            w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-300 ease-in-out
            ${
              i === currentStep
                ? "bg-gray-900 text-white shadow-lg scale-110"
                : i < currentStep
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-400"
            }
          `}
          >
            {i + 1}
          </div>
          <span
            className={`
            mt-2 text-sm font-medium
            ${
              i === currentStep
                ? "text-gray-900"
                : i < currentStep
                ? "text-gray-700"
                : "text-gray-400"
            }
          `}
          >
            {Object.keys(STEPS)[i].toLowerCase()}
          </span>
        </motion.div>
      ))}
      <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200 -z-10" />
    </div>
  </div>
);

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full px-4 py-2 rounded-lg border border-gray-200
        focus:ring-2 focus:ring-gray-900 focus:border-transparent
        transition-all duration-200 ease-in-out bg-white
        ${className}
      `}
    />
  </div>
);

const buttonStyles = {
  primary: "bg-gray-900 text-white hover:bg-gray-800",
  secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
  danger: "text-red-500 hover:text-red-600",
  link: "text-gray-900 hover:text-gray-700",
};

const StepContainer = ({ children, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
  >
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
    </div>
    {children}
  </motion.div>
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      address: "",
      phone: "",
      email: "",
      github: "",
      photo: null,
    },
    objective: "",
    education: [
      {
        school: "",
        degree: "",
        major: "",
        location: "",
        period: "",
      },
    ],
    workExperience: [
      {
        title: "",
        company: "",
        period: "",
        responsibilities: [""],
      },
    ],
    certifications: [""],
    technicalSkills: {
      programmingLanguage: [""],
      webTechnologies: [""],
      developerTools: [""],
      languages: [""],
      softSkills: [""],
      industryKnowledge: [""],
      tools: [""],
      certifications: [""],
      videoEditing: false,
      graphicDesign: false,
    },
    references: [
      {
        name: "",
        title: "",
        email: "",
        phone: "",
        institution: "",
        address: "",
      },
    ],
  });

  const [showPreview, setShowPreview] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [currentStep, setCurrentStep] = useState(STEPS.PERSONAL);

  const handleNext = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.REVIEW));
    setIsLoading(false);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, STEPS.PERSONAL));
  };

  const handleAddItem = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], prev[section][0]],
    }));
  };

  const handleRemoveItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            photo: file,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => {
      const newEducation = [...prev.education];
      newEducation[index] = {
        ...newEducation[index],
        [field]: value,
      };
      return {
        ...prev,
        education: newEducation,
      };
    });
  };

  const handleWorkExperienceChange = (index, field, value) => {
    setFormData((prev) => {
      const newWorkExperience = [...prev.workExperience];
      newWorkExperience[index] = {
        ...newWorkExperience[index],
        [field]: value,
      };
      return {
        ...prev,
        workExperience: newWorkExperience,
      };
    });
  };

  const handleResponsibilityChange = (workIndex, respIndex, value) => {
    setFormData((prev) => {
      const newWorkExperience = [...prev.workExperience];
      newWorkExperience[workIndex].responsibilities[respIndex] = value;
      return {
        ...prev,
        workExperience: newWorkExperience,
      };
    });
  };

  const handleSkillChange = (category, index, value) => {
    setFormData((prev) => {
      const newSkills = { ...prev.technicalSkills };
      newSkills[category][index] = value;
      return {
        ...prev,
        technicalSkills: newSkills,
      };
    });
  };

  const handleAddSkill = (category) => {
    setFormData((prev) => ({
      ...prev,
      technicalSkills: {
        ...prev.technicalSkills,
        [category]: [...prev.technicalSkills[category], ""],
      },
    }));
  };

  const handleRemoveSkill = (category, index) => {
    setFormData((prev) => ({
      ...prev,
      technicalSkills: {
        ...prev.technicalSkills,
        [category]: prev.technicalSkills[category].filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleReferenceChange = (index, field, value) => {
    setFormData((prev) => {
      const newReferences = [...prev.references];
      newReferences[index] = {
        ...newReferences[index],
        [field]: value,
      };
      return {
        ...prev,
        references: newReferences,
      };
    });
  };

  const handlePersonalInfoChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.PERSONAL:
        return renderPersonalStep();

      case STEPS.OBJECTIVE:
        return (
          <StepContainer
            title="Career Objective"
            subtitle="Tell us about your career goals"
          >
            <textarea
              className="w-full p-2 border rounded min-h-[100px]"
              placeholder="Enter your career objective..."
              value={formData.objective}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  objective: e.target.value,
                }))
              }
            />
          </StepContainer>
        );

      case STEPS.EDUCATION:
        return (
          <StepContainer
            title="Education"
            subtitle="Tell us about your educational background"
          >
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="School Name"
                    className="w-full p-2 border rounded"
                    value={edu.school}
                    onChange={(e) =>
                      handleEducationChange(index, "school", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full p-2 border rounded"
                    value={edu.location}
                    onChange={(e) =>
                      handleEducationChange(index, "location", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    className="w-full p-2 border rounded"
                    value={edu.degree}
                    onChange={(e) =>
                      handleEducationChange(index, "degree", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Period"
                    className="w-full p-2 border rounded"
                    value={edu.period}
                    onChange={(e) =>
                      handleEducationChange(index, "period", e.target.value)
                    }
                  />
                </div>
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveItem("education", index)}
                    className="mt-2 text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => handleAddItem("education")}
              className="text-blue-500"
            >
              + Add Education
            </button>
          </StepContainer>
        );

      case STEPS.EXPERIENCE:
        return (
          <StepContainer
            title="Work Experience"
            subtitle="Tell us about your professional experience"
          >
            {formData.workExperience.map((work, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company/Organization"
                    className="w-full p-2 border rounded"
                    value={work.company}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        "company",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="text"
                    placeholder="Period"
                    className="w-full p-2 border rounded"
                    value={work.period}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        "period",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    className="w-full p-2 border rounded col-span-2"
                    value={work.title}
                    onChange={(e) =>
                      handleWorkExperienceChange(index, "title", e.target.value)
                    }
                  />
                </div>
                <div className="mt-2">
                  <h4 className="font-semibold">Responsibilities:</h4>
                  {work.responsibilities.map((resp, rIndex) => (
                    <input
                      key={rIndex}
                      type="text"
                      placeholder="Add responsibility"
                      className="w-full p-2 border rounded mt-2"
                      value={resp}
                      onChange={(e) =>
                        handleResponsibilityChange(
                          index,
                          rIndex,
                          e.target.value
                        )
                      }
                    />
                  ))}
                  <button
                    className="mt-2 text-blue-500"
                    onClick={() => {
                      const newExp = [...formData.workExperience];
                      newExp[index].responsibilities.push("");
                      setFormData((prev) => ({
                        ...prev,
                        workExperience: newExp,
                      }));
                    }}
                  >
                    + Add Responsibility
                  </button>
                </div>
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveItem("workExperience", index)}
                    className="mt-2 text-red-500"
                  >
                    Remove Experience
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => handleAddItem("workExperience")}
              className="text-blue-500"
            >
              + Add Work Experience
            </button>
          </StepContainer>
        );

      case STEPS.SKILLS:
        return (
          <StepContainer title="Skills" subtitle="Highlight your key skills">
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Technical Skills</h3>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Programming Languages</h4>
                  {formData.technicalSkills.programmingLanguage.map(
                    (skill, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Add programming language"
                          className="w-full p-2 border rounded"
                          value={skill}
                          onChange={(e) =>
                            handleSkillChange(
                              "programmingLanguage",
                              index,
                              e.target.value
                            )
                          }
                        />
                        {index > 0 && (
                          <button
                            onClick={() =>
                              handleRemoveSkill("programmingLanguage", index)
                            }
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    )
                  )}
                  <button
                    onClick={() => handleAddSkill("programmingLanguage")}
                    className="text-blue-500"
                  >
                    + Add Programming Language
                  </button>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Web Technologies</h4>
                  {formData.technicalSkills.webTechnologies.map(
                    (tech, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Add web technology"
                          className="w-full p-2 border rounded"
                          value={tech}
                          onChange={(e) =>
                            handleSkillChange(
                              "webTechnologies",
                              index,
                              e.target.value
                            )
                          }
                        />
                        {index > 0 && (
                          <button
                            onClick={() =>
                              handleRemoveSkill("webTechnologies", index)
                            }
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    )
                  )}
                  <button
                    onClick={() => handleAddSkill("webTechnologies")}
                    className="text-blue-500"
                  >
                    + Add Web Technology
                  </button>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Developer Tools</h4>
                  {formData.technicalSkills.developerTools.map(
                    (tool, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Add developer tool"
                          className="w-full p-2 border rounded"
                          value={tool}
                          onChange={(e) =>
                            handleSkillChange(
                              "developerTools",
                              index,
                              e.target.value
                            )
                          }
                        />
                        {index > 0 && (
                          <button
                            onClick={() =>
                              handleRemoveSkill("developerTools", index)
                            }
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    )
                  )}
                  <button
                    onClick={() => handleAddSkill("developerTools")}
                    className="text-blue-500"
                  >
                    + Add Developer Tool
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Languages</h3>
                {formData.technicalSkills.languages.map((lang, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add language and proficiency (e.g., English - Native)"
                      className="w-full p-2 border rounded"
                      value={lang}
                      onChange={(e) =>
                        handleSkillChange("languages", index, e.target.value)
                      }
                    />
                    {index > 0 && (
                      <button
                        onClick={() => handleRemoveSkill("languages", index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleAddSkill("languages")}
                  className="text-blue-500"
                >
                  + Add Language
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Soft Skills</h3>
                {formData.technicalSkills.softSkills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add soft skill (e.g., Leadership, Communication)"
                      className="w-full p-2 border rounded"
                      value={skill}
                      onChange={(e) =>
                        handleSkillChange("softSkills", index, e.target.value)
                      }
                    />
                    {index > 0 && (
                      <button
                        onClick={() => handleRemoveSkill("softSkills", index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleAddSkill("softSkills")}
                  className="text-blue-500"
                >
                  + Add Soft Skill
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">
                  Industry Knowledge
                </h3>
                {formData.technicalSkills.industryKnowledge.map(
                  (knowledge, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add industry-specific knowledge"
                        className="w-full p-2 border rounded"
                        value={knowledge}
                        onChange={(e) =>
                          handleSkillChange(
                            "industryKnowledge",
                            index,
                            e.target.value
                          )
                        }
                      />
                      {index > 0 && (
                        <button
                          onClick={() =>
                            handleRemoveSkill("industryKnowledge", index)
                          }
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )
                )}
                <button
                  onClick={() => handleAddSkill("industryKnowledge")}
                  className="text-blue-500"
                >
                  + Add Industry Knowledge
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Tools & Software</h3>
                {formData.technicalSkills.tools.map((tool, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add tool or software proficiency"
                      className="w-full p-2 border rounded"
                      value={tool}
                      onChange={(e) =>
                        handleSkillChange("tools", index, e.target.value)
                      }
                    />
                    {index > 0 && (
                      <button
                        onClick={() => handleRemoveSkill("tools", index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleAddSkill("tools")}
                  className="text-blue-500"
                >
                  + Add Tool/Software
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Certifications</h3>
                {formData.technicalSkills.certifications.map((cert, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add certification"
                      className="w-full p-2 border rounded"
                      value={cert}
                      onChange={(e) =>
                        handleSkillChange(
                          "certifications",
                          index,
                          e.target.value
                        )
                      }
                    />
                    {index > 0 && (
                      <button
                        onClick={() =>
                          handleRemoveSkill("certifications", index)
                        }
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleAddSkill("certifications")}
                  className="text-blue-500"
                >
                  + Add Certification
                </button>
              </div>
            </div>
          </StepContainer>
        );

      case STEPS.REFERENCES:
        return (
          <StepContainer
            title="References"
            subtitle="List your professional references"
          >
            {formData.references.map((ref, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                    value={ref.name}
                    onChange={(e) =>
                      handleReferenceChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 border rounded"
                    value={ref.title}
                    onChange={(e) =>
                      handleReferenceChange(index, "title", e.target.value)
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={ref.email}
                    onChange={(e) =>
                      handleReferenceChange(index, "email", e.target.value)
                    }
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full p-2 border rounded"
                    value={ref.phone}
                    onChange={(e) =>
                      handleReferenceChange(index, "phone", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    className="w-full p-2 border rounded"
                    value={ref.institution}
                    onChange={(e) =>
                      handleReferenceChange(
                        index,
                        "institution",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full p-2 border rounded"
                    value={ref.address}
                    onChange={(e) =>
                      handleReferenceChange(index, "address", e.target.value)
                    }
                  />
                </div>
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveItem("references", index)}
                    className="mt-2 text-red-500"
                  >
                    Remove Reference
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => handleAddItem("references")}
              className="text-blue-500"
            >
              + Add Reference
            </button>
          </StepContainer>
        );

      case STEPS.REVIEW:
        return (
          <StepContainer
            title="Review Your Resume"
            subtitle="Make sure everything is correct"
          >
            <div className="space-y-6">
              {showPreview ? (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                  <ResumePreview
                    formData={formData}
                    photoPreview={photoPreview}
                    onClose={() => setShowPreview(false)}
                  />
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Click the button below to preview your resume before
                    exporting.
                  </p>
                  <button
                    onClick={() => setShowPreview(true)}
                    className={`${buttonStyles.primary} px-6 py-3 rounded-lg
                      transition-colors inline-flex items-center`}
                  >
                    <HiOutlineDocumentAdd className="w-5 h-5 mr-2" />
                    Preview Resume
                  </button>
                </div>
              )}
            </div>
          </StepContainer>
        );

      default:
        return null;
    }
  };

  const renderPersonalStep = () => (
    <StepContainer
      title="Personal Information"
      subtitle="Let's start with your basic information"
    >
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <InputField
            label="Full Name"
            value={formData.personalInfo.fullName}
            onChange={(e) =>
              handlePersonalInfoChange("fullName", e.target.value)
            }
            placeholder="e.g., John Doe"
            className="text-2xl font-semibold"
          />
        </div>
        <InputField
          label="Email"
          type="email"
          value={formData.personalInfo.email}
          onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
          placeholder="e.g., john@example.com"
        />
        <InputField
          label="Phone"
          type="tel"
          value={formData.personalInfo.phone}
          onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
          placeholder="e.g., +1 234 567 890"
        />
        <div className="col-span-2">
          <InputField
            label="Address"
            value={formData.personalInfo.address}
            onChange={(e) =>
              handlePersonalInfoChange("address", e.target.value)
            }
            placeholder="e.g., 123 Main St, City, Country"
          />
        </div>
        <div className="col-span-2">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <InputField
                label="GitHub Profile"
                type="url"
                value={formData.personalInfo.github}
                onChange={(e) =>
                  handlePersonalInfoChange("github", e.target.value)
                }
                placeholder="e.g., https://github.com/johndoe"
              />
            </div>
            <div className="w-40">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <div className="relative h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-900 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                {photoPreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={photoPreview}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity rounded-lg cursor-pointer"
                    >
                      Change Photo
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="photo-upload"
                    className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 cursor-pointer"
                  >
                    <HiOutlinePhotograph className="w-8 h-8 mb-2" />
                    <span className="text-sm">Upload Photo</span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StepContainer>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build Your Professional Resume
          </h1>
          <p className="text-lg text-gray-600">
            Create a standout resume in minutes with our step-by-step builder
          </p>
        </div>

        <StepIndicator
          currentStep={currentStep}
          totalSteps={Object.keys(STEPS).length}
        />

        {renderStep()}

        <div className="flex justify-between mt-8">
          {currentStep > STEPS.PERSONAL && (
            <button
              onClick={handleBack}
              className={`flex items-center px-6 py-3 rounded-lg
                shadow-sm transition-colors ${buttonStyles.secondary}`}
            >
              <FiChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          )}

          {currentStep < STEPS.REVIEW && (
            <button
              onClick={handleNext}
              disabled={isLoading}
              className={`flex items-center px-6 py-3 rounded-lg
                shadow-sm transition-colors ml-auto ${buttonStyles.primary}
                disabled:opacity-70 disabled:cursor-not-allowed min-w-[120px]
                justify-center`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Next...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Next</span>
                  <FiChevronRight className="w-5 h-5" />
                </div>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
