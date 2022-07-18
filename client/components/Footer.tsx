const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content mt-auto">
      <div>
        <p className="text-3xl">🎿</p>
        <p>
          SKEE Industries Ltd.
          <br />
          Shredding the gnar since '22
        </p>
      </div>

      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
};

export default Footer;
