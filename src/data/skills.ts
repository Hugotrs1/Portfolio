import type { Skill, SkillLevel } from "@/types";

export const skills: Skill[] = [
  { name: "Flutter", icon: "/icons/flutter.svg", level: "Avancé" },
  { name: "Java", icon: "/icons/java.svg", level: "Intermédiaire" },
  { name: "JSP", icon: "/icons/jsp.svg", level: "Intermédiaire" },
  { name: "SQL", icon: "/icons/mysql.svg", level: "Intermédiaire" },
  { name: "HTML", icon: "/icons/html5.svg", level: "Intermédiaire" },
  { name: "CSS", icon: "/icons/css3.svg", level: "Intermédiaire" },
  { name: "JavaScript", icon: "/icons/javascript.svg", level: "Débutant" },
  { name: "PHP", icon: "/icons/php.svg", level: "Débutant" },
  { name: "Python", icon: "/icons/python.svg", level: "Débutant" },
  { name: "Git & GitHub", icon: "/icons/github.svg", level: "Débutant" },
];

export const skillLevels: SkillLevel[] = ["Avancé", "Intermédiaire", "Débutant"];
