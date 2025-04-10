
import { Award, Briefcase, Code, LineChart } from "lucide-react";

const About = () => {
  const expertise = [
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      title: "Business Strategy",
      description:
        "Developing and implementing data-driven strategies to enhance business performance and drive sustainable growth."
    },
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "AI Implementation",
      description:
        "Leveraging artificial intelligence and machine learning to create innovative solutions that solve complex business challenges."
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary" />,
      title: "Data Analytics",
      description:
        "Transforming raw data into actionable insights that inform strategic decision-making and operational improvements."
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Process Optimization",
      description:
        "Streamlining business processes and workflows to improve efficiency, reduce costs, and enhance quality."
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            I'm a strategic business consultant with expertise in AI implementation and data analytics. 
            With a background spanning management consulting and technology, I help organizations 
            navigate digital transformation and leverage emerging technologies to create sustainable 
            competitive advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertise.map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 card-hover"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gray-50 rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-bold mb-4">My Mission</h3>
              <div className="w-20 h-1 bg-primary mb-6"></div>
            </div>
            <div className="md:w-2/3">
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower organizations with the strategies, insights, and technologies they need to thrive in an increasingly digital and AI-driven world. I believe in creating practical, actionable solutions that deliver measurable business value while preparing companies for long-term success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
