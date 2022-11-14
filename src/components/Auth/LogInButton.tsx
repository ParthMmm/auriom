import { useState } from "react";
import LogInModal from "./LogInModal";

function LogInButton({}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>log in</button>
      <LogInModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default LogInButton;
