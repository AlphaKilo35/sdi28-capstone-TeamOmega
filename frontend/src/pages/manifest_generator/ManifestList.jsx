import React from "react";
import StatusSelector from "./StatusSelector";
export default function ManifestList({
  manifestJumpers,
  removeFromManifest,
  manifestStatus,
  updateStatus,
  totalSeats,
  userData,
  toggleJumpDuty,
}) {
  const isAdmin = userData && userData.role.toLowerCase() === "admin";

  let assignedJMs = 0;
  manifestJumpers.forEach((jumper) => {
    if (jumper.jm && jumper.jump_duty) assignedJMs++;
  });

  return (
    <div className="border border-gold-400 p-4">
      <h2 className="font-bold p-2 text-center text-2xl">Flight Manifest</h2>
      <div className="flex justify-center">
        <StatusSelector
          manifestStatus={manifestStatus}
          userData={userData}
          updateStatus={updateStatus}
        />
      </div>
      <div className="mt-2 font-bold mb-4 text-center flex justify-center items-center gap-4">
        Available Seats: {totalSeats - manifestJumpers.length} / {totalSeats}
        <span className="text-gold-400">|</span>
        <div>Assigned JMs: {assignedJMs}</div>
      </div>
      {manifestJumpers.map((jumper) => (
        <div
          key={`manifest-${jumper.manifest_id}`}
          className="flex justify-between p-2 border border-gold-400"
        >
          <div>
            {jumper.name}{" "}
            {jumper.jm && <span className="font-bold"> (JM)</span>}
            <div className="text-gray-500">{jumper.unit}</div>
          </div>
          {isAdmin && (
            <div className="flex gap-2 items-center">
              {jumper.jm && (
                <button
                  onClick={() => toggleJumpDuty(jumper)}
                  className={`inline-flex w-full justify-center rounded-md bg-gold-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto
                    ${jumper.jump_duty ? "opacity-100" : "opacity-40"}`}
                >
                  JM Duty: {jumper.jump_duty ? "Assigned" : "Unassigned"}
                </button>
              )}
              <button
                onClick={() => removeFromManifest(jumper)}
                className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gold-600 sm:ml-3 sm:w-auto"
              >
                remove
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
