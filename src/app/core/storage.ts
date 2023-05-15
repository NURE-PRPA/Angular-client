import {Injectable} from "@angular/core";
import {Course} from "./models/course";
import {Lecturer} from "./models/lecturer";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CourseStorage {
  private _store: Course[] = [
    {
      id: 3,
      name: 'C# for everyone',
      description: 'Become a full stack developer now!',
      difficulty: 1,
      price: 20,
      topic: 1,
      lecturer: null,
      modules: [
        {
          name: 'C# basics'
        },
        {
          name: 'C# web'
        }
      ],
      subscriptions: [],
    }
  ];

  get Store() {
    return this._store;
  }
}
