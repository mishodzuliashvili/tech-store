import getCurrentUser from "@/actions/users/get-current-user";
import { Input } from "@/components/ui/input";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { createParser, useQueryState, parseAsJson } from "nuqs";
import { useEffect } from "react";
import { z } from "zod";

type ProfilePageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageProps) {
  const res = await getCurrentUser();
  if (!res.success) notFound();

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">General</h2>
        <p className="text-gray-600">General information about the user</p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            id="email"
            value={res.data.email}
            type="email"
            disabled
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="givenName"
            className="block text-sm font-medium text-gray-700"
          >
            Given Name
          </label>
          <Input
            id="givenName"
            value={res.data.givenName}
            type="text"
            disabled
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="familyName"
            className="block text-sm font-medium text-gray-700"
          >
            Family Name
          </label>
          <Input
            id="familyName"
            value={res.data.familyName}
            type="text"
            disabled
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}
