import { FlowType } from 'src/app/models/Enums/FlowType'
export class flowCreationModel {
  date: Date = new Date()
  value: number = 0
  description: string = ""
  userId: string = ""
  flowType: FlowType = 0
}
