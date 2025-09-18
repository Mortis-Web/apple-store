import { footerLinks } from './../constants/index';
const Footer = () => {
  return (
    <footer className="px-5 py-5 capitalize sm:px-10">
      <div className="screen-max-width">
        <div className="text-gray text-xs font-semibold">
          <p>
            More Ways To Shop:{' '}
            <span className="text-blue mx-1 capitalize underline">
              find an apple store!
            </span>{' '}
            or
            <span className="text-blue mx-1 capitalize underline">
              Other retailer
            </span>{' '}
            near you.
          </p>
          <p>Or Call 012-345-6789 </p>
        </div>

        <span className="my-5 block h-[1px] w-full bg-neutral-700" />
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <p className="text-gray text-xs font-semibold">
            copyright © 2025 Apple inc. all rights reserved.
          </p>

          <span className="flex">
            {footerLinks.map((link, index) => (
              <p key={link} className="text-gray text-xs font-semibold">
                {link}
                {''}
                {index !== footerLinks.length - 1 && (
                  <span className="mx-1.5">|</span>
                )}
              </p>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
