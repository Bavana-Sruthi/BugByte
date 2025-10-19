import type { ImagePlaceholder } from "./placeholder-images";
import { PlaceHolderImages } from "./placeholder-images";

export type SymptomLog = {
  month: string;
  headaches: number;
  dizziness: number;
  spasms: number;
};

export const symptomHistory: SymptomLog[] = [
  { month: "Jan", headaches: 5, dizziness: 3, spasms: 1 },
  { month: "Feb", headaches: 6, dizziness: 4, spasms: 2 },
  { month: "Mar", headaches: 4, dizziness: 2, spasms: 1 },
  { month: "Apr", headaches: 7, dizziness: 5, spasms: 3 },
  { month: "May", headaches: 5, dizziness: 4, spasms: 2 },
  { month: "Jun", headaches: 8, dizziness: 6, spasms: 4 },
];

export type RiskEntry = {
  date: string;
  risk: number;
};

export const riskHistory: RiskEntry[] = [
  { date: "01-01", risk: 25 },
  { date: "01-08", risk: 30 },
  { date: "01-15", risk: 28 },
  { date: "01-22", risk: 45 },
  { date: "01-29", risk: 40 },
  { date: "02-05", risk: 55 },
  { date: "02-12", risk: 62 },
  { date: "02-19", risk: 58 },
];

export type Volunteer = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: ImagePlaceholder;
};

const volunteerImages = PlaceHolderImages.filter((p) =>
  p.id.startsWith("volunteer")
);

export const volunteers: Volunteer[] = [
  {
    id: "vol-1",
    name: "Dr. Anya Sharma",
    role: "Neurologist",
    bio: "Dr. Sharma has over 15 years of experience in neurology, specializing in seizure disorders and stroke prevention. She is passionate about leveraging technology to improve patient outcomes.",
    avatar:
      volunteerImages.find((p) => p.id === "volunteer-1") ??
      ({
        id: "volunteer-1",
        imageUrl: "https://picsum.photos/seed/1/200/200",
        imageHint: "woman doctor",
      } as ImagePlaceholder),
  },
  {
    id: "vol-2",
    name: "Rohan Verma",
    role: "EMT & First Responder",
    bio: "Rohan is a certified paramedic with a decade of experience in emergency medical services. He trains communities on first aid for seizures and strokes.",
    avatar:
      volunteerImages.find((p) => p.id === "volunteer-2") ??
      ({
        id: "volunteer-2",
        imageUrl: "https://picsum.photos/seed/2/200/200",
        imageHint: "man paramedic",
      } as ImagePlaceholder),
  },
  {
    id: "vol-3",
    name: "Priya Desai",
    role: "Dermatology Nurse",
    bio: "Priya is a dermatology nurse practitioner who believes in a holistic approach to skin health, combining clinical treatments with lifestyle advice.",
    avatar:
      volunteerImages.find((p) => p.id === "volunteer-3") ??
      ({
        id: "volunteer-3",
        imageUrl: "https://picsum.photos/seed/3/200/200",
        imageHint: "woman nurse",
      } as ImagePlaceholder),
  },
  {
    id: "vol-4",
    name: "Dr. Kenji Tanaka",
    role: "Cardiologist",
    bio: "Dr. Tanaka focuses on cardiovascular health and its connection to neurological events. He is an advocate for preventative care and regular health monitoring.",
    avatar:
      volunteerImages.find((p) => p.id === "volunteer-4") ??
      ({
        id: "volunteer-4",
        imageUrl: "https://picsum.photos/seed/4/200/200",
        imageHint: "man doctor",
      } as ImagePlaceholder),
  },
  {
    id: "vol-5",
    name: "Fatima Ahmed",
    role: "Community Health Worker",
    bio: "Fatima works to bridge the gap between healthcare services and the community, providing support and education to underserved populations.",
    avatar:
      volunteerImages.find((p) => p.id === "volunteer-5") ??
      ({
        id: "volunteer-5",
        imageUrl: "https://picsum.photos/seed/5/200/200",
        imageHint: "woman community",
      } as ImagePlaceholder),
  },
  {
    id: "vol-6",
    name: "Leo Gonzalez",
    role: "AI Health Researcher",
    bio: "Leo is a researcher focused on developing AI models for predictive health analytics. He contributes to the core technology behind Cureva.",
    avatar:
      volunteerImages.find((p) => p.id === "volunteer-6") ??
      ({
        id: "volunteer-6",
        imageUrl: "https://picsum.photos/seed/6/200/200",
        imageHint: "man researcher",
      } as ImagePlaceholder),
  },
];
