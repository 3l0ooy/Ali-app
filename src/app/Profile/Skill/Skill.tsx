import { useEffect, useState } from 'react';
import Style from "./Skill.module.css";

// Define types
interface Skill {
    type: string;
    amount: number;
}

const Skill = () => {
    const [skillsData, setSkillsData] = useState<Skill[]>([]);
    const [technicalSkills, setTechnicalSkills] = useState<Skill[]>([]);
    const [technologies, setTechnologies] = useState<Skill[]>([]);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        const jwt = localStorage.getItem("jwt");

        if (!jwt || jwt.split(".").length !== 3) {
            console.error("Invalid Token");
            return;
        }

        try {
            const response = await fetch(
                "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: `
                            query skills {
                                transaction(
                                    where: {
                                        _and: [
                                            {type: { _iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])" }},
                                            {type: {_like: "%skill%"}} ,
                                            {object: {type: {_eq: "project"}}},
                                            {type: {_in: [
                                                "skill_prog", "skill_algo", "skill_sys-admin", "skill_front-end", 
                                                "skill_back-end", "skill_stats", "skill_ai", "skill_game", "skill_tcp",
                                                "skill_go", "skill_js", "skill_html", "skill_css", "skill_unix", 
                                                "skill_docker", "skill_sql", "skill_git"
                                            ]}}
                                        ]
                                    }
                                    order_by: [{type: asc}, {createdAt: desc}]
                                    distinct_on: type
                                ) {
                                    amount
                                    type
                                }
                            }
                        `,
                    }),
                }
            );

            const result = await response.json();

            if (result.errors) {
                console.error("GraphQL Errors:", result.errors);
                return;
            }

            const fetchedSkills = result.data?.transaction || [];
            setSkillsData(fetchedSkills);

            // Separate the skills into two categories
            const technicalSkills = fetchedSkills.filter((skill: Skill) => 
                ["skill_prog", "skill_algo", "skill_sys-admin", "skill_front-end", 
                "skill_back-end", "skill_stats", "skill_ai", "skill_game", "skill_tcp"].includes(skill.type));
                
            const technologies = fetchedSkills.filter((skill: Skill) => 
                ["skill_go", "skill_js", "skill_html", "skill_css", "skill_unix", 
                "skill_docker", "skill_sql", "skill_git"].includes(skill.type));

            setTechnicalSkills(technicalSkills);
            setTechnologies(technologies);
            drawSkillsChart(technicalSkills, technologies);

        } catch (error) {
            console.error("Error fetching skills data:", error);
        }
    };

    const drawSkillsChart = (technicalSkills: Skill[], technologies: Skill[]) => {
        const svgTech = document.getElementById('skills-chart-tech') as unknown as SVGSVGElement;
        const svgTechs = document.getElementById('skills-chart-techs') as unknown as SVGSVGElement;
        const width = svgTech.clientWidth;
        const height = svgTech.clientHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        const levels = 4;
        const maxValueTech = Math.max(...technicalSkills.map(d => d.amount), 1);
        const maxValueTechs = Math.max(...technologies.map(d => d.amount), 1);

        const radius = (Math.min(width, height) / 3.5) - 10; 
        const angleSliceTech = (Math.PI * 2) / technicalSkills.length;
        const angleSliceTechs = (Math.PI * 2) / technologies.length;
        const scale = 0.75; 

        svgTech.innerHTML = '';
        svgTechs.innerHTML = '';

        // Draw circles for Technical Skills (on svgTech)
        const techCircleY = centerY - radius;
        for (let i = 1; i <= levels; i++) {
            const levelRadius = (i / levels) * radius;
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute('cx', centerX.toString());
            circle.setAttribute('cy', techCircleY.toString());
            circle.setAttribute('r', levelRadius.toString());
            circle.setAttribute('stroke', '#ddd');
            circle.setAttribute('fill', 'none');
            svgTech.appendChild(circle);
        }

        // Draw axes and labels for Technical Skills
        technicalSkills.forEach((d, i) => {
            const angle = angleSliceTech * i - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = techCircleY + Math.sin(angle) * radius;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute('x1', centerX.toString());
            line.setAttribute('y1', techCircleY.toString());
            line.setAttribute('x2', x.toString());
            line.setAttribute('y2', y.toString());
            line.setAttribute('stroke', '#bbb');
            svgTech.appendChild(line);

            const labelX = centerX + Math.cos(angle) * (radius + 15);
            const labelY = techCircleY + Math.sin(angle) * (radius + 15);
            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute('x', labelX.toString());
            label.setAttribute('y', labelY.toString());
            label.setAttribute('dy', y > techCircleY ? "1em" : "-0.5em");
            label.setAttribute('text-anchor', x > centerX ? "start" : "end");
            label.setAttribute('fill', '#ffffff');
            label.setAttribute('font-family', '"IBM Plex Mono", monospace');
            label.setAttribute('font-weight', '300');
            label.setAttribute('font-size', '15px');
            label.textContent = d.type.replace("skill_", "").replace("-", " ");
            svgTech.appendChild(label);
        });

        // Draw spiderweb path for Technical Skills
        let techPoints = '';
        technicalSkills.forEach((d, i) => {
            const angle = angleSliceTech * i - Math.PI / 2;
            const valueRadius = (d.amount / maxValueTech) * radius * scale;
            const x = centerX + Math.cos(angle) * valueRadius;
            const y = techCircleY + Math.sin(angle) * valueRadius;
            techPoints += `${x},${y} `;
        });

        const techPath = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        techPath.setAttribute('points', techPoints.trim());
        techPath.setAttribute('fill', 'rgba(0, 128, 255, 0.4)');
        techPath.setAttribute('stroke', '#007bff');
        techPath.setAttribute('stroke-width', '2');
        svgTech.appendChild(techPath);

        // Draw circles for Technologies (on svgTechs)
        const techCircleY2 = centerY + radius; 
        for (let i = 1; i <= levels; i++) {
            const levelRadius = (i / levels) * radius;
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute('cx', centerX.toString());
            circle.setAttribute('cy', techCircleY2.toString());
            circle.setAttribute('r', levelRadius.toString());
            circle.setAttribute('stroke', '#ddd');
            circle.setAttribute('fill', 'none');
            svgTechs.appendChild(circle);
        }

        // Draw axes and labels for Technologies
        technologies.forEach((d, i) => {
            const angle = angleSliceTechs * i - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = techCircleY2 + Math.sin(angle) * radius;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute('x1', centerX.toString());
            line.setAttribute('y1', techCircleY2.toString());
            line.setAttribute('x2', x.toString());
            line.setAttribute('y2', y.toString());
            line.setAttribute('stroke', '#bbb');
            svgTechs.appendChild(line);

            const labelX = centerX + Math.cos(angle) * (radius + 15);
            const labelY = techCircleY2 + Math.sin(angle) * (radius + 15);
            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute('x', labelX.toString());
            label.setAttribute('y', labelY.toString());
            label.setAttribute('dy', y > techCircleY2 ? "1em" : "-0.5em");
            label.setAttribute('text-anchor', x > centerX ? "start" : "end");
            label.setAttribute('fill', '#ffffff');
            label.setAttribute('font-family', '"IBM Plex Mono", monospace');
            label.setAttribute('font-weight', '300');
            label.setAttribute('font-size', '15px');
            label.textContent = d.type.replace("skill_", "").replace("-", " ");
            svgTechs.appendChild(label);
        });

        // Draw spiderweb path for Technologies
        let techsPoints = '';
        technologies.forEach((d, i) => {
            const angle = angleSliceTechs * i - Math.PI / 2;
            const valueRadius = (d.amount / maxValueTechs) * radius * scale;
            const x = centerX + Math.cos(angle) * valueRadius;
            const y = techCircleY2 + Math.sin(angle) * valueRadius;
            techsPoints += `${x},${y} `;
        });

        const techsPath = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        techsPath.setAttribute('points', techsPoints.trim());
        techsPath.setAttribute('fill', 'rgba(255, 165, 0, 0.4)');
        techsPath.setAttribute('stroke', '#ff8c00');
        techsPath.setAttribute('stroke-width', '2');
        svgTechs.appendChild(techsPath);
    };

    return (
        <div className={Style.Skill}>
            <div id="skills-amount" className={Style.skillsAmount}>
                <h3 className={Style.h3m}>Technical Skills:</h3>
                <p className={Style.Technologies}>{technicalSkills.length > 0 
                    ? technicalSkills.map(skill => `${skill.type.replace("skill_", "").replace("-", " ")}: ${skill.amount}%`).join(", ") 
                    : "No technical skills data available"}</p> 
                <h3  className={Style.h3z}>Technologies:</h3>
                <p  className={Style.technologies2}>{technologies.length > 0 
                    ? technologies.map(skill => `${skill.type.replace("skill_", "").replace("-", " ")}: ${skill.amount}%`).join(", ") 
                    : "No technologies data available"}</p>
            </div>
            <div className={Style.ChartWrapper}>
                <svg id="skills-chart-tech" className={Style.Chart} width="400" height="400"></svg>
                <svg id="skills-chart-techs" className={Style.Chart1} width="400" height="400"></svg>
            </div>
        </div>
    );
};

export default Skill;
