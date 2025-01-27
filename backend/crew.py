from crewai import Agent, Crew, Process, Task, LLM
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import DirectoryReadTool, FileReadTool, SerperDevTool, WebsiteSearchTool, TXTSearchTool, PDFSearchTool

@CrewBase
class CareerDevelopmentCrew:
    @agent
    def profile_analyzer(self) -> Agent:
        return Agent(
            config=self.agents_config['profile_analyzer'],
            llm = LLM(
                model="gemini/gemini-1.5-flash-latest",
                temperature=0.7
            ),
            verbose=True,
            tools=[
                DirectoryReadTool(directory="./user_data"),
                FileReadTool()
            ]
        )

    @agent
    def roadmap_creator(self) -> Agent:
        return Agent(
            config=self.agents_config['roadmap_creator'],
            llm = LLM(
                model="gemini/gemini-1.5-flash-latest",
                temperature=0.7
            ),
            verbose=True,
            tools=[
                SerperDevTool(),
                WebsiteSearchTool()
            ]
        )

    @agent
    def career_advisor(self) -> Agent:
        return Agent(
            config=self.agents_config['career_advisor'],
            llm = LLM(
                model="gemini/gemini-1.5-flash-latest",
                temperature=0.7
            ),
            verbose=True,
            tools=[
                TXTSearchTool(),
                PDFSearchTool()
            ]
        )

    @task
    def analyze_profile_task(self) -> Task:
        return Task(
            config=self.tasks_config['analyze_profile'],
        )

    @task
    def create_roadmap_task(self) -> Task:
        return Task(
            config=self.tasks_config['create_roadmap'],
        )

    @task
    def career_guidance_task(self) -> Task:
        return Task(
            config=self.tasks_config['career_guidance'],
            output_file='output/career_guidance.md'
        )

    @crew
    def crew(self) -> Crew:
        """Creates the Career Development crew"""
        return Crew(
            agents=self.agents,  
            tasks=self.tasks, 
            process=Process.sequential,
            verbose=True,
        )