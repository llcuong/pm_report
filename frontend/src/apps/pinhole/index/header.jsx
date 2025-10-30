import React from "react";
import DropdownCustom from "@bases/components/DropdownCustom";
import DropdownDate from "@bases/components/DropdownDate";
import {FACTORY_OPTIONS} from "./pinholeConstants";

export default function PinholeHeader({
                                          title,
                                          aqlOptions,
                                          selectedAql,
                                          setSelectedAql,
                                          selectedDate,
                                          setSelectedDate,
                                          selectedFactory,
                                          setSelectedFactory,
                                          branchOptions,
                                          selectedBranch,
                                          setSelectedBranch,
                                          isFull,
                                          setIsFull,
                                      }) {
    return (
        <div className="flex items-start gap-6">
            <div className="flex-1 flex flex-col">
                <h1 className="text-2xl font-bold text-blue-700">
                    Pinhole Inspection Data
                    {title && (
                        <span className="inline-block ml-2 align-baseline text-blue-700">
              – {title}
            </span>
                    )}
                </h1>
            </div>

            <div className="shrink-0 flex gap-3">
                <DropdownCustom
                    key="aql"
                    options={aqlOptions}
                    placeholder="AQL"
                    value={selectedAql}
                    onChange={setSelectedAql}
                    buttonClassName="w-22"
                    menuClassName="w-22"
                    disabled={!aqlOptions?.length}
                />

                <DropdownDate value={selectedDate} onChange={setSelectedDate}/>

                <DropdownCustom
                    options={FACTORY_OPTIONS}
                    placeholder="Factory"
                    value={selectedFactory}
                    onChange={setSelectedFactory}
                    buttonClassName="w-40"
                    menuClassName="w-40"
                />

                <DropdownCustom
                    key={selectedFactory?.value}
                    options={branchOptions}
                    placeholder="Branch"
                    value={selectedBranch}
                    onChange={setSelectedBranch}
                    buttonClassName="w-24"
                    menuClassName="w-24"
                    disabled={branchOptions.length === 0}
                />

                <button
                    type="button"
                    title={isFull ? "Thu nhỏ (Esc)" : "Phóng to"}
                    onClick={() => setIsFull(v => !v)}
                    className="w-[47px] h-[47px] flex items-center justify-center border-2 border-gray-200 rounded-lg hover:bg-gray-50"
                    aria-pressed={isFull}
                >
                    {isFull ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-200" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}