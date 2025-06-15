import { Link } from "react-router-dom";
const MainPage = () => {
  return (
    <div style={{ color: "white", textAlign: "left" }}>
      <h2>Welcome to the Tribe Nine archival project!</h2>
      <p>
        Content will slowly be added over time. Currently, the pages available
        are <Link to="./party">Party</Link>,{" "}
        <Link to="./characters">Characters</Link>,{" "}
        <Link to="./tension-cards">Tension Cards</Link> and{" "}
        <Link to="./chat">NINE Chats</Link>.
      </p>
      <p>
        Disclaimer: If you select party members, this site will use a browser
        cookie to save your party member selection.
      </p>
      <p>
        Do let me know if you encounter any issues. (Discord: @skythel / X:{" "}
        <a href="https://x.com/Remileth_" rel="noreferrer" target="_blank">
          @Remileth_
        </a>
        )
      </p>
      <p>
        <a
          href="https://github.com/Skythel/t9-archive"
          rel="noreferrer"
          target="_blank"
        >
          GitHub source
        </a>
      </p>
    </div>
  );
};
export default MainPage;
