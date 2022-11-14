import { useState } from "react";
import SignUpModal from "./SignUpModal";

function SignUpButton({}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full border-2 border-harlequin-500 p-2 transition-colors hover:border-harlequin-700 hover:text-harlequin-500"
      >
        sign up
      </button>
      <SignUpModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default SignUpButton;
