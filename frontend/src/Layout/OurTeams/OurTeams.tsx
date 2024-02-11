import { Image } from "@chakra-ui/react";
import { OurTeamsType, SocialLinks, Teams } from "../../types/ourteams";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./OurTeams.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const OurTeams = () => {
  return (
    <>
      {Teams &&
        Teams.map((team: OurTeamsType) => (
          <div key={team.name} className="teams__card">
            <div className="team__avatar">
              <Image
                src={team.avatar}
                className="team__image"
                alt="Team Name"
              />
            </div>

            <div className="teams__desc">
              <p className="team__designation">{team.designation}</p>
              <h6 className="team__name">{team.name}</h6>

              <div className="team__social">
                {team.social_links &&
                  team.social_links.map((links: SocialLinks) => (
                    <Fragment key={links.name}>
                      {links.name === "instagram" && (
                        <Link
                          to={`${links.url}`}
                          className="team__social__container social__insta"
                        >
                          <FaInstagram
                            size={20}
                            color="#fff"
                            className="team__social__icon"
                          />
                        </Link>
                      )}
                      {links.name === "linkedin" && (
                        <Link
                          to={`${links.url}`}
                          className="team__social__container social__linkedin"
                        >
                          <FaLinkedin
                            size={20}
                            color="#fff"
                            className="team__social__icon"
                          />
                        </Link>
                      )}
                      {links.name === "twitter" && (
                        <Link
                          to={`${links.url}`}
                          className="team__social__container social__twitter"
                        >
                          <FaXTwitter
                            size={20}
                            color="#fff"
                            className="team__social__icon"
                          />
                        </Link>
                      )}
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default OurTeams;
