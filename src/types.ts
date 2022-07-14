export type Path = { name: string; path: string; component: React.ReactNode };
export type PublicPath = Path & {
  restricted?: boolean;
  subPaths?: PublicPath[];
  nestedPaths?: PublicPath[];
};
export type PrivatePath = Path & {
  subPaths?: PrivatePath[];
  nestedPaths?: PublicPath[];
};
