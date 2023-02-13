import { timestamp } from "./utils";
import { DEFAULT_SELECTED } from "./constants";

export const usersDummyData = [ 
  { 
    id: 1,
    userId: 'johndoe', 
    firstName: "John", 
    lastName: "Doe", 
    email: 'john.doe@gmail.com', 
    status: 'initiated',
    createdOn: timestamp(), 
    selected: DEFAULT_SELECTED, 
  },
  { 
    id: 2,
    userId: 'janedoes', 
    firstName: "Jane", 
    lastName: "Does", 
    email: 'jane.does@gmail.com', 
    status: 'registered',
    createdOn: timestamp(), 
    selected: DEFAULT_SELECTED, 
  },
  { 
    id: 3,
    userId: 'emilybrown', 
    firstName: "Emily", 
    lastName: "Brown", 
    email: 'emily.brown@gmail.com', 
    status: 'inactive',
    createdOn: timestamp(), 
    selected: DEFAULT_SELECTED, 
  },
  { 
    id: 4,
    userId: 'pepesmith', 
    firstName: "Pepe", 
    lastName: "Smith", 
    email: 'pepe.smith@gmail.com', 
    status: 'active',
    createdOn: timestamp(), 
    selected: DEFAULT_SELECTED, 
  },
]