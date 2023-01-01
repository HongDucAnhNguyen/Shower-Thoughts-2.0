import React from "react";

const AboutPage = () => {
  return (
    <div style={{ padding: "100px" }}>
      <h3> Hi 👋, I'm Jay Nguyen</h3>
      <h4> Front End Developer, based in Canada.</h4>
      <p>
        Glad to see you here! Whether you are new or have known about this
        project before. Welcome to Shower Thoughts! the new version (you can see
        the old one{" "}
        <a
          target="blank"
          style={{ cursor: "pointer", color: "orange" }}
          href="https://github.com/HongDucAnhNguyen/ShowerThoughts"
          alt="Shower Thoughts 1.0"
        >
          here
        </a>{" "}
        ). A place where you can share your Ingenious Contemplations that
        suddenly occured during a Shower on a sunny Friday morning, be honest,
        we've all been there.
      </p>
      <p>That's enough talking. Enjoy your stay, and remember, EUREKA!</p>
    </div>
  );
};

export default AboutPage;
