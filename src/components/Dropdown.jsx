import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/*
  Dropdown — accessible custom select (listbox). Trigger button plus animated
  popover list. Keyboard: Up, Down, Home, End, Enter, Space, Escape; type to
  open; click outside to close. Controlled by value/onChange so the parent form
  can include the selection in its Web3Forms JSON payload. On brand styling with
  a chevron that rotates. Imported by AuditForm. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

export function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  name,
  id,
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1); // keyboard highlighted index
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const triggerRef = useRef(null);
  const reactId = useId();
  const fieldId = id ?? `dd-${reactId}`;
  const listId = `${fieldId}-list`;

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // When opening, highlight the selected (or first) option and focus the list
  // so the keyboard handlers receive arrow and enter keys.
  useEffect(() => {
    if (open) {
      const idx = options.indexOf(value);
      setActive(idx >= 0 ? idx : 0);
      const raf = requestAnimationFrame(() => listRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
  }, [open, options, value]);

  function selectAt(idx) {
    const opt = options[idx];
    if (opt == null) return;
    onChange(opt);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onTriggerKeyDown(e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  }

  function onListKeyDown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        selectAt(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  }

  return (
    <div className="w-full" ref={rootRef}>
      {label && (
        <label
          htmlFor={fieldId}
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      {/* hidden input so the value is part of the form data too */}
      {name && <input type="hidden" name={name} value={value ?? ""} />}

      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          id={fieldId}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onTriggerKeyDown}
          className={cn(
            "flex h-[50px] w-full items-center justify-between rounded-xl border bg-card px-4 text-left text-[0.95rem] transition-colors",
            open
              ? "border-primary ring-2 ring-primary/30"
              : "border-line hover:border-foreground/15",
            value ? "text-foreground" : "text-muted/80"
          )}
        >
          <span className="truncate">{value || placeholder}</span>
          <motion.svg
            viewBox="0 0 16 16"
            className="ml-2 size-4 shrink-0 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <path d="M4 6l4 4 4-4" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              ref={listRef}
              id={listId}
              role="listbox"
              tabIndex={-1}
              aria-label={label}
              aria-activedescendant={
                active >= 0 ? `${fieldId}-opt-${active}` : undefined
              }
              onKeyDown={onListKeyDown}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="no-scrollbar absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-line bg-card p-1.5 shadow-lg"
            >
              {options.map((opt, idx) => {
                const selected = opt === value;
                const isActive = idx === active;
                return (
                  <li
                    key={opt}
                    id={`${fieldId}-opt-${idx}`}
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => selectAt(idx)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-[0.95rem] transition-colors",
                      isActive ? "bg-hover text-foreground" : "text-foreground",
                      selected && "font-medium"
                    )}
                  >
                    <span>{opt}</span>
                    {selected && (
                      <svg
                        viewBox="0 0 16 16"
                        className="size-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8.5l3 3 7-7" />
                      </svg>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
