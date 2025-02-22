import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Image from "next/image";
import Link from "next/link";

const ADDRESS = "Tbilisi\n1234 Street\nGeorgia";

const CONTACTS = [
  {
    icon: MailIcon,
    title: "Email us",
    content: "hello@techstore.com",
    link: "mailto:hello@techstore.com",
  },
  {
    icon: PhoneIcon,
    title: "Call us",
    content: "+995 577 77 77 77",
    link: "tel:+995577777777",
  },
];

type ContactUsPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ContactUsPage({
  params,
  searchParams,
}: ContactUsPageProps) {
  return (
    <div className="container mt-5">
      <Breadcrumb
        path={[
          {
            id: 1,
            name: "Contact Us",
            parentCategoryId: null,
          },
        ]}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-6 md:gap-8 lg:gap-12">
        <ContactImage />
        <ContactInfo />
      </div>
    </div>
  );
}

function ContactImage() {
  return (
    <div className="aspect-w-16 aspect-h-6 lg:aspect-h-14 overflow-hidden rounded-2xl">
      <Image
        className="group-hover:scale-105 transition-transform duration-500 ease-in-out object-cover rounded-2xl"
        src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        // src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Tech Store Contact"
        width={3540}
        height={2360}
      />
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="space-y-8 lg:space-y-16">
      <AddressSection />
      <ContactsSection />
    </div>
  );
}

function AddressSection() {
  return (
    <div>
      <h3 className="mb-5 font-semibold">Our address</h3>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        <InfoItem icon={MapPinIcon} title="Address" content={ADDRESS} />
      </div>
    </div>
  );
}

function ContactsSection() {
  return (
    <div>
      <h3 className="mb-5 font-semibold">Our contacts</h3>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {CONTACTS.map((contact, index) => (
          <InfoItem key={index} {...contact} />
        ))}
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, title, content, link }: any) {
  return (
    <div className="flex gap-4">
      <Icon className="flex-shrink-0 size-5 " />
      <div className="grow">
        <p className="text-sm ">{title}</p>
        {link ? (
          <p>
            <Link
              className="relative inline-block font-medium before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-primary/50 hover:before:bg-primary focus:outline-none focus:before:bg-black"
              href={link}
            >
              {content}
            </Link>
          </p>
        ) : (
          <address className="mt-1 not-italic">{content}</address>
        )}
      </div>
    </div>
  );
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"></path>
      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"></path>
    </svg>
  );
}

function PhoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
