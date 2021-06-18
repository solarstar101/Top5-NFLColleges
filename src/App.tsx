import "tailwindcss/tailwind.css";

import Loader from "./Components/Loader";
import NFL from "../src/assets/nfl.svg";
import Searchbar from "./Components/Searchbar";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);

  const getTeamData = async () => {
    setLoading(true);

    const AllTeamsRequest: [] = await axios
      .get(`http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams`)
      .then((res) => res.data.sports[0].leagues[0].teams);

    const TeamInfo = await Promise.all(
      AllTeamsRequest.map((team: { team: { id: string } }) =>
        axios
          .get(
            `http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team.team.id}/roster`
          )
          .then((res) => res.data)
      )
    );

    const AthleteInfo = await TeamInfo.map(
      (team: { athletes: [] }) => team?.athletes
    )
      .flat()
      .map((cat: { items: [] }) => cat?.items)
      .flat()
      .map((player: { college: string }) => player?.college);

    const sortedObj = AthleteInfo.map(
      (point:any) => (point?.name)
    )
      .sort()
      .reduce((obj: any, e: any) => {
        obj[e] = (obj[e] || 0) + 1;
        return obj;
      }, {});

    const final: any = Object.entries(sortedObj).sort(
      (a: any, b: any) => b[1] - a[1]
    );

    await setResults(final);
    await setLoading(false);
  };

  return (
    <div className='flex items-center min-h-screen w-full p-2  bg-gray-200 justify-center'>
      <div className=' bg-white shadow overflow-hidden rounded-lg p-4 max-w-7xl mx-auto  my-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='items-center  text-3xl text-center justify-center font-medium text-gray-700'>
          Top 5 Most Attended Colleges By Current NFL Players
        </h1>

        <Searchbar
          results={results}
          getTeamData={getTeamData}
          setResults={setResults}
        />

        <div className='flow-root  max-w-3xl mx-auto'>
          <ul className='-my-5 divide-y mt-2 divide-gray-200'>
            {results === "" && !loading && <img alt='logo' src={NFL} />}

            {loading && (
              <div className='flex items-center justify-center  p-4 '>
                <Loader />
              </div>
            )}

            {results !== "" &&
              loading === false &&
              Object.entries(results)
                .slice(0, 5)
                .map(([key, value]) => {
                  return (
                    <li key={key} className='py-4'>
                      <div className='flex items-center space-x-4'>
                        <div className='flex-shrink-0 text-xl font-semibold'>
                          {Number(key) + 1})
                        </div>
                        <div className='flex-1  min-w-0'>
                          <p className='text-lg space-x-2 font-medium text-gray-900 truncate'>
                            {value.toString().replace(/,/g, " has had ")} NFL
                            Players
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
