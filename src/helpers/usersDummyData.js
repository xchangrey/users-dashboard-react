import { timestamp } from "./utils";
import { DEFAULT_SELECTED } from "./constants";

export const usersDummyData = [ 
  { 
    id: 1, 
    firstName: "John", 
    lastName: "Doe", 
    email: 'john.doe@gmail.com', 
    status: 'initiated',
    createdOn: timestamp(), 
    selected: DEFAULT_SELECTED, 
  },
  { 
    id: 2, 
    firstName: "Jane", 
    lastName: "Doe", 
    email: 'jane.doe@gmail.com', 
    status: 'registered',
    createdOn: timestamp(), 
    selected: DEFAULT_SELECTED, 
  },
  { 
    id: 3, 
    firstName: "Emily", 
    lastName: "Brown", 
    email: 'emily.brown@gmail.com', 
    status: 'inactive',
    createdOn: timestamp(), 
    selected: DEFAULT_SELECTED, 
  },
  { 
    id: 4, 
    firstName: "Pepe", 
    lastName: "Smith", 
    email: 'pepe.smith@gmail.com', 
    status: 'registered',
    createdOn: timestamp(), 
    selected: DEFAULT_SELECTED, 
  },
]