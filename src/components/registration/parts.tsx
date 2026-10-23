"use client";

import { DragEvent, ReactNode, useEffect, useState } from "react";
import { formatBytes } from "./validation";

export type Choice = { value: string; label: string; note?: string };

export function toChoices(items: { id: number; name: string }[]): Choice[] {
  return items.map((item) => ({ value: String(item.id), label: item.name }));
}

/* ---------- Icons ---------- */

type IconName = "calendar" | "pin" | "check" | "upload" | "file" | "shield" | "spark" | "user" | "trophy";

const iconPaths: Record<IconName, ReactNode> = {
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  pin: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  upload: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  spark: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
    </>
  ),
};

export function Icon({ name, size = 16, strokeWidth = 2 }: { name: IconName; size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

/* ---------- Hero & stepper ---------- */

export function RegHero({
  badge,
  eyebrow,
  title,
  sub,
  pills,
}: {
  badge: string;
  eyebrow?: string;
  title: string;
  sub: ReactNode;
  pills: { icon: IconName; text: string }[];
}) {
  return (
    <header className="reg_hero_banner">
      <div className="container reg_hero_inner">
        <div className="row">
          <div className="col-lg-10">
            <div className="reg_hero_badge">{badge}</div>
            {eyebrow ? <p className="reg_hero_eyebrow">{eyebrow}</p> : null}
            <h1 className="reg_hero_title">{title}</h1>
            <p className="reg_hero_sub">{sub}</p>
            <div className="reg_hero_pills">
              {pills.map((pill) => (
                <span className="reg_hero_pill" key={pill.text}>
                  <Icon name={pill.icon} size={14} />
                  {pill.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Stepper({
  steps,
  step,
  completed,
  canJump,
  onJump,
}: {
  steps: string[];
  step: number;
  completed: number[];
  canJump: (step: number) => boolean;
  onJump: (step: number) => void;
}) {
  return (
    <div className="stepper_outer" id="reg-stepper">
      <div className="stepper_card">
        <nav className="stepper_track" aria-label="Registration progress">
          {steps.map((name, index) => {
            const number = index + 1;
            const done = completed.includes(number) && number !== step;
            const state = number === step ? "active" : done ? "completed" : "";
            const label = String(number).padStart(2, "0");
            return (
              <div key={name} style={{ display: "contents" }}>
                <button
                  type="button"
                  className={`step_node ${state}`}
                  onClick={() => onJump(number)}
                  disabled={number === step || !canJump(number)}
                  aria-current={number === step ? "step" : undefined}
                  aria-label={`Step ${label}: ${name}${done ? " (completed)" : ""}`}
                >
                  <span className="step_badge">{done ? <Icon name="check" size={15} strokeWidth={3} /> : label}</span>
                  <span className="step_text_box">
                    <span className="step_num">Step {label}</span>
                    <span className="step_name">{name}</span>
                  </span>
                </button>
                {number < steps.length ? (
                  <div className={`step_line ${completed.includes(number) ? "completed" : ""}`} />
                ) : null}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function StepHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="step_pane_header">
      <p className="step_pane_kicker">{kicker}</p>
      <h2 className="step_pane_title">{title}</h2>
      {sub ? <p className="step_pane_sub">{sub}</p> : null}
    </div>
  );
}

/* ---------- Fields ---------- */

export function RequiredMark() {
  return (
    <span className="required_mark" aria-hidden="true">
      *
    </span>
  );
}

export function FieldError({ message, id }: { message?: string; id?: string }) {
  if (!message) return null;
  return (
    <div className="field_error_msg" id={id} role="alert">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  required,
  optional,
  helper,
  error,
  children,
  className = "",
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  helper?: ReactNode;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  const LabelTag = htmlFor ? "label" : "div";
  return (
    <div className={`reg_field ${className}`} data-invalid={error ? "true" : undefined}>
      <LabelTag className="reg_label" {...(htmlFor ? { htmlFor } : {})}>
        {label}
        {required ? <RequiredMark /> : null}
        {optional ? <span className="reg_optional">(optional)</span> : null}
      </LabelTag>
      {helper ? <div className="reg_helper">{helper}</div> : null}
      {children}
      <FieldError message={error} />
    </div>
  );
}

export function PhoneField({
  id,
  value,
  onChange,
  invalid,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}) {
  return (
    <div className={`phone_group ${invalid ? "is-invalid" : ""}`}>
      <span className="phone_prefix">+91</span>
      <input
        id={id}
        type="tel"
        className="input_box"
        inputMode="numeric"
        maxLength={10}
        placeholder="10-digit mobile number"
        value={value}
        onChange={(event) => onChange(event.target.value.replace(/\D/g, "").slice(0, 10))}
        autoComplete="tel-national"
        aria-invalid={invalid || undefined}
      />
    </div>
  );
}

export function ChoiceCards({
  name,
  items,
  type,
  selected,
  onToggle,
  columns,
}: {
  name: string;
  items: Choice[];
  type: "radio" | "checkbox";
  selected: string[];
  onToggle: (value: string) => void;
  columns?: 2;
}) {
  return (
    <div className={`card_grid ${columns === 2 ? "cols_2" : ""}`} role={type === "radio" ? "radiogroup" : "group"}>
      {items.map((item) => {
        const checked = selected.includes(item.value);
        const id = `${name}-${item.value}`.replace(/\s+/g, "-");
        return (
          <label
            key={item.value}
            htmlFor={id}
            className={`choice_card ${type === "checkbox" ? "is_checkbox" : ""} ${checked ? "selected" : ""}`}
          >
            <input
              type={type}
              id={id}
              name={name}
              value={item.value}
              checked={checked}
              onChange={() => onToggle(item.value)}
            />
            <span className="choice_indicator" />
            <span className="choice_body">
              <span className="choice_text">{item.label}</span>
              {item.note ? <span className="choice_note">{item.note}</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function ChipGrid({
  name,
  items,
  selected,
  onToggle,
}: {
  name: string;
  items: Choice[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="chip_grid" role="group">
      {items.map((item) => {
        const checked = selected.includes(item.value);
        const id = `${name}-${item.value}`;
        return (
          <label key={item.value} htmlFor={id} className={`chip_item ${checked ? "active" : ""}`}>
            <input type="checkbox" id={id} name={name} value={item.value} checked={checked} onChange={() => onToggle(item.value)} />
            {item.label}
          </label>
        );
      })}
    </div>
  );
}

/* ---------- Uploads ---------- */

export function useObjectUrl(file: File | null) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setUrl("");
      return;
    }
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);
  return url;
}

function FilePreview({ file, previewUrl, onRemove }: { file: File; previewUrl: string; onRemove: () => void }) {
  return (
    <div className="file_preview_card">
      <div className="file_preview_main">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className="file_preview_thumb" />
        ) : (
          <span className="file_preview_thumb">
            <Icon name="file" size={20} />
          </span>
        )}
        <div style={{ minWidth: 0 }}>
          <div className="file_preview_name">{file.name}</div>
          <div className="file_preview_size">{formatBytes(file.size)}</div>
        </div>
      </div>
      <button type="button" className="file_remove_btn" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}

export function Dropzone({
  id,
  accept,
  hint,
  file,
  onFile,
  invalid,
  prompt = "Click to upload",
}: {
  id: string;
  accept: string;
  hint: string;
  file: File | null;
  onFile: (file: File | null) => void;
  invalid?: boolean;
  prompt?: string;
}) {
  const [dragging, setDragging] = useState(false);
  const previewUrl = useObjectUrl(file);

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) onFile(dropped);
  }

  if (file) return <FilePreview file={file} previewUrl={previewUrl} onRemove={() => onFile(null)} />;

  return (
    <label
      htmlFor={id}
      className={`dropzone_box ${dragging ? "dragover" : ""} ${invalid ? "is-invalid" : ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    >
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={(event) => {
          onFile(event.target.files?.[0] ?? null);
          event.target.value = "";
        }}
      />
      <span className="dropzone_icon">
        <Icon name="upload" size={30} strokeWidth={1.75} />
      </span>
      <div className="dropzone_text">
        <span>{prompt}</span> or drag and drop
      </div>
      <p className="dropzone_hint">{hint}</p>
    </label>
  );
}

export function PhotoUpload({
  id,
  file,
  onFile,
  invalid,
}: {
  id: string;
  file: File | null;
  onFile: (file: File | null) => void;
  invalid?: boolean;
}) {
  const previewUrl = useObjectUrl(file);
  return (
    <div className="photo_upload">
      <div className={`photo_frame ${previewUrl ? "has_photo" : ""}`}>
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Attendee photo preview" />
        ) : (
          <Icon name="user" size={40} strokeWidth={1.5} />
        )}
      </div>
      <div className="photo_actions">
        <Dropzone
          id={id}
          accept="image/jpeg,image/png"
          hint="JPG / JPEG / PNG • 600 × 600 px • Max 2 MB"
          file={file}
          onFile={onFile}
          invalid={invalid}
          prompt="Upload photo"
        />
      </div>
    </div>
  );
}

/* ---------- Review, declarations, navigation ---------- */

export function ReviewSummary({
  title,
  rows,
  total,
  onEdit,
}: {
  title: string;
  rows: [string, ReactNode][];
  total?: [string, ReactNode];
  onEdit?: () => void;
}) {
  return (
    <div className="review_summary_box">
      <div className="review_summary_head">
        <span className="review_summary_title">{title}</span>
        {onEdit ? (
          <button type="button" className="review_edit_btn" onClick={onEdit}>
            Edit details
          </button>
        ) : null}
      </div>
      {rows.map(([label, value]) => (
        <div className="review_item_row" key={label}>
          <span className="review_label">{label}</span>
          <span className="review_val">{value || "—"}</span>
        </div>
      ))}
      {total ? (
        <div className="review_item_row is_total">
          <span className="review_label">{total[0]}</span>
          <span className="review_val">{total[1]}</span>
        </div>
      ) : null}
    </div>
  );
}

export function Declarations({
  name,
  items,
  selected,
  onToggle,
  invalid,
}: {
  name: string;
  items: Choice[];
  selected: string[];
  onToggle: (value: string) => void;
  invalid?: boolean;
}) {
  return (
    <div className={`declaration_list ${invalid ? "is-invalid" : ""}`}>
      {items.map((item) => {
        const id = `${name}-${item.value}`;
        return (
          <label className="declaration_item" htmlFor={id} key={item.value}>
            <input
              type="checkbox"
              id={id}
              name={name}
              value={item.value}
              checked={selected.includes(item.value)}
              onChange={() => onToggle(item.value)}
            />
            <span className="declaration_text">
              {item.label}
              <RequiredMark />
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function FormNav({
  backLabel,
  onBack,
  children,
}: {
  backLabel?: string;
  onBack?: () => void;
  children: ReactNode;
}) {
  return (
    <div className={`form_nav_bar ${onBack ? "" : "is_end"}`}>
      {onBack ? (
        <button type="button" className="btn_prev_step" onClick={onBack}>
          ← {backLabel}
        </button>
      ) : null}
      {children}
    </div>
  );
}

export function SuccessCard({
  title,
  sub,
  refLabel,
  refValue,
  children,
}: {
  title: string;
  sub: string;
  refLabel: string;
  refValue: string;
  children?: ReactNode;
}) {
  return (
    <div className="step_pane success_card" role="status">
      <div className="success_icon">
        <Icon name="check" size={32} strokeWidth={2.5} />
      </div>
      <h2 className="success_title">{title}</h2>
      <p className="success_sub">{sub}</p>
      <div className="success_ref">
        <span className="success_ref_label">{refLabel}</span>
        <span className="success_ref_value">{refValue}</span>
      </div>
      {children}
    </div>
  );
}

/* ---------- Pass card ---------- */

export type PassCardProps = {
  variant: "hackathon" | "delegate";
  title: string;
  subtitle: string;
  meta: { icon: "calendar" | "pin"; label: string; value: string; sub?: string }[];
  inclusionsTitle: string;
  inclusions: ReactNode[];
  badge: {
    label?: string;
    role: string;
    name: string;
    org: string;
    orgPlaceholder: string;
  };
};

// Layout and sizes follow the pass mockups; see .pass_card in registration.css.
export function PassCard({ variant, title, subtitle, meta, inclusionsTitle, inclusions, badge }: PassCardProps) {
  const official = (
    <span className="pass_official">
      <Icon name="check" size={14} strokeWidth={3} />
      Official
    </span>
  );
  return (
    <div className="col-lg-4 register_rightbox">
      <div className="sticky_pass_wrapper">
        <aside className={`pass_card is_${variant}`} aria-label={title}>
          <header className="pass_head">
            {variant === "hackathon" ? official : null}
            <div className="pass_title_row">
              <h3 className="pass_title">{title}</h3>
              {variant === "delegate" ? official : null}
            </div>
            <p className="pass_subtitle">{subtitle}</p>
          </header>

          <div className="pass_badge">
            <div className="pass_badge_top">
              {badge.label ? <span className="pass_badge_label">{badge.label}</span> : null}
              <span className="pass_badge_role">{badge.role}</span>
            </div>
            <div className="pass_badge_person">
              <div className="pass_badge_name">{badge.name || "Your Name"}</div>
              <div className="pass_badge_org">{badge.org || badge.orgPlaceholder}</div>
            </div>
          </div>

          <div className="pass_waves" aria-hidden="true" />
          {variant === "delegate" ? <div className="pass_tri_rule" aria-hidden="true" /> : null}

          <div className="pass_meta_list">
            {meta.map((item) => (
              <div className="pass_meta_item" key={item.label}>
                <div className={`pass_meta_icon is_${item.icon}`}>
                  <Icon name={item.icon} size={20} strokeWidth={2.25} />
                </div>
                <div>
                  <div className="pass_meta_label">{item.label}</div>
                  <div className="pass_meta_val">{item.value}</div>
                  {item.sub ? <div className="pass_meta_sub">{item.sub}</div> : null}
                </div>
              </div>
            ))}
          </div>

          <div className="pass_inclusions">
            <div className="pass_inclusions_title">{inclusionsTitle}</div>
            <ul className="pass_inclusions_list">
              {inclusions.map((item, index) => (
                <li key={index}>
                  <Icon name="check" size={14} strokeWidth={3.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pass_help">
            <div className="pass_help_ask">Need assistance with your registration?</div>
            <div>
              Email: <a href="mailto:s_semtechconclave@smcw.edu.in">s_semtechconclave@smcw.edu.in</a>
            </div>
          </div>

          <div className="pass_footer" aria-hidden="true">
            <span className="pass_arch is_green" />
            <span className="pass_arch is_orange" />
          </div>
        </aside>
      </div>
    </div>
  );
}
