import React, { useEffect, useState } from "react";
import axios from "axios";

interface FindingsMitigation {
  findings_processed: number;
  self_resolved_findings: number;
}

interface BehaviourAndPostureEnhancement {
  behaviours_improved: number;
  percentage_behaviour_improved: string;
  postures_improved: number;
  percentage_posture_improved: string;
}

interface RiskPrevention {
  breaches_prevented: number;
  risks_blocked: number;
}

interface EfficiencyAndImpact {
  time_saved: string;
  users_interactions: number;
}

interface StatsData {
  findings_mitigation: FindingsMitigation[];
  behaviour_and_posture_enhancement: BehaviourAndPostureEnhancement[];
  risk_prevention: RiskPrevention[];
  efficiency_and_impact: EfficiencyAndImpact[];
}

export const StatsComponent = () => {
  const [data, setData] = useState<StatsData | null>(null);

  const fetchStatsDetails = async () => {
    try {
      const response = await axios.get(
        "https://b6f3466b-ffde-4659-9224-423ff963bddc.mock.pstmn.io/getStatsData"
      );
      setData(response.data.content[0].components[0].details.data);
    } catch (error) {
      console.error("Error fetching stats data:", error);
    }
  };
  useEffect(() => {
    fetchStatsDetails();
  }, []);
  if (!data) {
    return <div>Loading...</div>;
  }
  console.log({ data });
  const {
    findings_mitigation: [
      { findings_processed = 0, self_resolved_findings = 0 } = {},
    ] = [],
    behaviour_and_posture_enhancement: [
      {
        behaviours_improved = 0,
        percentage_behaviour_improved = "0%",
        postures_improved = 0,
        percentage_posture_improved = "0%",
      } = {},
    ] = [],
    risk_prevention: [{ breaches_prevented = 0, risks_blocked = 0 } = {}] = [],
    efficiency_and_impact: [
      { time_saved = "0hrs", users_interactions = 0 } = {},
    ] = [],
  } = data;
  return (
    <div className="flex flex-row justify-center">
      <div className="bg-primary text-white p-10 rounded-lg">
        <div className="grid grid-cols-2 ">
          <div className="border-r border-b border-gray-700 pr-8 pb-8">
            <h2 className="text-xl font-normal mb-2 opacity-75">
              Findings Mitigation
            </h2>
            <div className="flex flex-row justify-between mt-4">
              <div>
                <p className="text-4xl font-normal">{findings_processed}</p>
                <p className="text-sm text-gray-400 mt-2.5">
                  Findings <br />
                  Processed
                </p>
              </div>
              <div>
                <p className="text-4xl font-normal">{self_resolved_findings}</p>
                <p className="text-sm text-gray-400 mt-2.5">
                  Self-Resolved <br />
                  Findings
                </p>
              </div>
            </div>
          </div>
          <div className="border-b border-l border-gray-700 pb-10 pl-10">
            <h2 className="text-xl font-normal mb-2 opacity-75">
              Behaviour & Posture Enhancement
            </h2>
            <div className="flex flex-row justify-between mt-4">
              <div>
                <p className="text-4xl font-normal tracking-tight leading-tight">
                  {behaviours_improved}
                  <span className="text-lg font-medium tracking-tighter text-green-500 ml-2">
                    ↑ {percentage_behaviour_improved}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mt-2.5">
                  Behaviors <br />
                  Improved
                </p>
              </div>
              <div>
                <p className="text-4xl font-normal tracking-tight leading-tight">
                  {postures_improved}
                  <span className="text-lg font-medium tracking-tighter text-green-500 ml-2">
                    ↑ {percentage_posture_improved}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mt-2.5">
                  Postures <br />
                  Improved
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-r border-gray-700 pt-10 pr-10">
            <h2 className="text-xl font-normal mb-2 opacity-75">
              Risk Prevention
            </h2>
            <div className="flex flex-row justify-between mt-4">
              <div>
                <p className="text-4xl font-normal">{breaches_prevented}</p>
                <p className="text-sm text-gray-400 mt-2.5">
                  Breaches
                  <br /> Prevented
                </p>
              </div>
              <div>
                <p className="text-4xl font-normal">{risks_blocked}</p>
                <p className="text-sm text-gray-400 mt-2.5">
                  Risks
                  <br /> Blocked
                </p>
              </div>
            </div>
          </div>
          <div className="border-l border-t border-gray-700 pl-10 pt-10">
            <h2 className="text-xl font-normal mb-2 opacity-75">
              Efficiency & Impact
            </h2>
            <div className="flex flex-row justify-between mt-4">
              <div>
                <p className="text-4xl font-normal">
                  {time_saved.split("hrs")[0]}
                  <span className="text-sm opacity-75">hrs</span>
                </p>
                <p className="text-sm text-gray-400 mt-2.5">
                  Time <br />
                  Saved
                </p>
              </div>
              <div>
                <p className="text-4xl font-normal">{users_interactions}</p>
                <p className="text-sm text-gray-400 mt-2.5">
                  User <br />
                  Interactions
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-10">
          <p className="text-lg font-medium tracking-tighter text-white opacity-75">
            Quilr Copilot Impact Summary
          </p>
          <button
            className="border-2 border-green-600 text-green-500 py-2 px-6 rounded-full"
            // style={{ width: "101px", height: "35px" }}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};
