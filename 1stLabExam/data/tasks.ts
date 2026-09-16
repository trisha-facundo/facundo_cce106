export type Task = {
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    status: "Pending" | "Completed";
  };
  
  export const tasks: Task[] = [
    {
      id: "1",
      title: "Create React Native UI",
      subject: "Mobile Development",
      dueDate: "September 18, 2026",
      status: "Completed",
    },
    {
      id: "2",
      title: "Study Static Routing",
      subject: "Networking",
      dueDate: "September 19, 2026",
      status: "Pending",
    },
    {
      id: "3",
      title: "Practice useState",
      subject: "Mobile Development",
      dueDate: "September 20, 2026",
      status: "Completed",
    },
    {
      id: "4",
      title: "Build Dynamic Route",
      subject: "Mobile Development",
      dueDate: "September 21, 2026",
      status: "Pending",
    },
    {
      id: "5",
      title: "Review IP Addressing",
      subject: "Networking",
      dueDate: "September 22, 2026",
      status: "Pending",
    },
    {
      id: "6",
      title: "Finish Laboratory Activity",
      subject: "Programming",
      dueDate: "September 23, 2026",
      status: "Completed",
    },
  ];