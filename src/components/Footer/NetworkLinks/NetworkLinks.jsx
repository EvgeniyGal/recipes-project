import cl from './networkLinks.module.scss';
import { TiSocialFacebook } from 'react-icons/ti';
import { AiFillInstagram } from 'react-icons/ai';
import { FaYoutube } from 'react-icons/fa';

const NetworkLinks = () => {
  return (
    <div>
      <ul className={cl.network_links_wrapper}>
        <li>
          <a
            href="https://www.facebook.com/goITclub/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
            className={cl.network_links}
          >
            <TiSocialFacebook className={cl.network_links_icons} />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/goitclub/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram page"
            className={cl.network_links}
          >
            <AiFillInstagram className={cl.network_links_icons} />
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/c/GoIT"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Youtube page"
            className={cl.network_links}
          >
            <FaYoutube className={cl.network_links_icons} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NetworkLinks;
