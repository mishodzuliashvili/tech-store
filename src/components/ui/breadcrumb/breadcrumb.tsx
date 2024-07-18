import Link from "next/link";
import {
  BreadcrumbWrapper,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb-components";
import React from "react";
import { Category } from "@prisma/client";

type Props = {
  path?: Category[];
  urls?: { name: string; url: string }[];
};

export default function Breadcrumb({ path, urls }: Props) {
  return (
    <BreadcrumbWrapper className="pb-4">
      <BreadcrumbList>
        <BreadcrumbLink asChild>
          <Link href={`/`}>Home</Link>
        </BreadcrumbLink>
        <BreadcrumbSeparator />
        {path?.map((category, i) => (
          <React.Fragment key={category.id}>
            <BreadcrumbItem>
              {i < path.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link href={`/category/${category.id}`}>{category.name}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{category.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {i < path.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
        {urls?.map((url, i) => (
          <React.Fragment key={url.url}>
            <BreadcrumbItem>
              {i < urls.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link href={url.url}>{url.name}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{url.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {i < urls.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbWrapper>
  );
}
