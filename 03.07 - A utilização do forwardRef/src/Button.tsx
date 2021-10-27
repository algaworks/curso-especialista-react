import { forwardRef } from "react";

interface ButtonProps {
  title: string;
}

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref
) {
  return (
    <div>
      <button ref={ref} onClick={() => window.alert("oi")}>
        {props.title}
      </button>
    </div>
  );
});
