import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {PERSONAL_WEBSITE_URL} from "@/utils/constants";

export default function Footer() {
  return (
    <div className="mr-10 ml-10 mt-auto flex h-28 flex-col items-center justify-center gap-2 border-t border-neutral-700 text-neutral-400 sm:h-16 sm:flex-row sm:gap-5">
      <p className="text-center">
        Made with
        <FontAwesomeIcon className="mr-2 ml-2" icon={faHeart} />
          by <a href={PERSONAL_WEBSITE_URL}><b>Valentin Menoret</b></a>
      </p>
      <p className="hidden sm:block">&#8226;</p>
      <a
        href="https://github.com/Spookywy/minesweeper"
        className="hover:text-neutral-100"
      >
        <FontAwesomeIcon className="mr-2" icon={faGithub} />
        Source code
      </a>
    </div>
  );
}
