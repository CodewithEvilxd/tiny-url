import React from "react";

export default function FooterSection() {
  return (
    <footer>
      <p className="text-center text-neutral-400">
        Copyright @ {new Date().getFullYear()} tiny-url
      </p>
      <p className="text-center text-neutral-400">
        Build with 💙 by{" "}
        <a
          href="https://github.com/codewithEvilxd"
          target="_blank"
          className="text-sky-500 hover:underline"
        >
          Nishant Gaurav
        </a>
      </p>
    </footer>
  );
}
