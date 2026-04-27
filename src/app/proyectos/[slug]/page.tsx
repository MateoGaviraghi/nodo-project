import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedProjects, getProjectBySlug } from "@/lib/projects";
import ProyectoCaseStudy from "./ProyectoCaseStudy";

export function generateStaticParams() {
  return getPublishedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado" };

  const title = `${project.title} — ${project.tagline.es}`;
  const description = project.summary.es;
  const url = `https://nodotech.dev/proyectos/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProyectoPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProyectoCaseStudy project={project} />;
}
