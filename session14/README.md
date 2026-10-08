# Session 14: Kubernetes Troubleshooting

## Task 1: Kubernetes Commands
The commands below (`get`, `describe`, `logs`, `exec`, `events`) are the primary tools used to inspect the state of resources, view container logs, and execute commands inside containers to find the root cause of issues.

## Task 2: Troubleshooting Common Issues
- **CrashLoopBackOff**: Occurs when a container repeatedly crashes after starting. *Solution*: Check `kubectl logs` to find the application error and fix the code/configuration.
- **ImagePullBackOff / ErrImagePull**: Occurs when Kubernetes cannot pull the container image. *Solution*: Verify the image name, tag, and registry credentials.
- **Pending Pods**: Occurs when the scheduler cannot place a pod on a node (often due to lack of resources like CPU/Memory). *Solution*: Check `kubectl describe pod` to see the scheduling error and scale up the cluster.
- **Service/DNS Issues**: Occurs when pods cannot resolve or reach services. *Solution*: Use a temporary busybox pod to `nslookup` the service and check endpoints (`kubectl get endpoints`).

---
01-kubectl-get

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/211ce4a9-696f-4169-ae9f-63ba910f7f8d" />

02-kubectl-describe

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/1805f611-4201-404b-a887-f59f65a34bed" />

03-kubectl-logs

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/9cc4542e-c7ac-4d4b-bc36-b930af7c5d83" />

04-kubectl--exec

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/e2e9fef9-4a5b-422e-95e1-c65376b9a4f9" />

05-events

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/8cc77218-0d8d-4374-8ca2-e1bc2a78787d" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/2e737f82-9617-4fea-8085-fcb143b72037" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/2d31a4bb-d0bf-48b9-8bbb-e0160abc740e" />

06-crashloopbackoff

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/9c270b39-957d-4235-abca-f75981bebf30" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/ce414f9e-5ffc-47f8-9b3f-089550a1c079" />

07-imagepullbackoff

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/9234ac0c-143e-46f6-a6d2-effc8057b6ca" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/3ca39b76-66a4-4e28-9327-2eabbc10635e" />

08-pending-pods
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/81aae2ca-641c-408f-acbe-e511a3925fe6" />

09-service-dns-troubleshooting

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/1cfb838c-b395-4ee3-8cba-34e80be0f272" />

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/028fa258-fcda-469a-b9ff-d05b005b3bdc" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/b9ba0314-347b-4b4e-8c0f-c5b53ff4b3b3" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/7987579f-bf17-4540-b85a-11d962c032fd" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/2d95d859-bdc0-4798-8d59-41f6ce11f2ec" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/25647a0a-59af-4bf8-a9a6-d9deca61a2c3" />

mini-project

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/f1215cd9-4318-445b-ad55-6f03bdefc756" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/1a6aac12-77fa-46fe-8834-df0510316ed4" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/00cc4801-be01-417b-814c-bfc0d350c837" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/d045bd7c-7b0d-4fbf-8bd5-36de7acac674" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/b93a9325-3a79-496e-a39c-7431a912fd93" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/c7b2b575-4f8c-4043-a107-8da75b0bef91" />
