import { storage } from "./storage"

export function setProjectId(projectId: string) {
  return storage.setItem("@markcms:projectId", projectId)
}

export function getProjectId() {
  return storage.getItem("@markcms:projectId")
}
