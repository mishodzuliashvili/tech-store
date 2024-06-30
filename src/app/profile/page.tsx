"use client";
import { createParser, useQueryState, parseAsJson } from "nuqs";
import { useEffect } from "react";
import { z } from "zod";

type ProfilePageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ProfilePage({
  params,
  searchParams,
}: ProfilePageProps) {
  return (
    <div onClick={() => {}} className="bg-black h-8 w-8 text-white p-5"></div>
  );
}
