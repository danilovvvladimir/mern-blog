// ==> Libs imports <===
import { FC } from "react";
// ==> Components imports <===

// ==> Other imports <===
import "./AboutPage.scss";

const AboutPage: FC = () => {
  return (
    <section className="about">
      <div className="container">
        <h1 className="title about__title">Welcome to our site!</h1>
        <p className="about__text">
          We are a platform that allows you to share your thoughts, insights and expertise with a
          wider audience. Our site is designed to be a space where people can connect, learn and
          engage in meaningful conversations.
        </p>
        <p className="about__text">
          Whether you are an expert in a particular field or simply passionate about sharing your
          personal experiences, we believe that your voice deserves to be heard. That's why we
          created this platform - to provide a space where you can publish your own articles and
          reach a wider audience.
        </p>
        <p className="about__text">
          Our community is made up of people from diverse backgrounds and perspectives, which we
          believe is what makes our platform unique. We encourage open and respectful discussions,
          and we are committed to maintaining a safe and welcoming environment for all our users.
        </p>
        <p className="about__text">
          With our user-friendly interface and seamless publishing process, you can easily create
          and share your own articles on our site. And with the option to comment and engage with
          other users, you can also build relationships and connect with like-minded individuals.
        </p>
        <p className="about__text">
          We are passionate about empowering people to share their stories, and we hope that our
          platform inspires you to do just that. Thank you for joining us on this journey!
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
