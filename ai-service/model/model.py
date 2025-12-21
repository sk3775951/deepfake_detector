import torch
import torch.nn as nn
from torchvision import models

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class MobileNetDeepfake(nn.Module):
    def __init__(self):
        super().__init__()
        self.model = models.mobilenet_v2(weights=None)
        self.model.classifier = nn.Sequential(
            nn.Dropout(0.7),
            nn.Linear(self.model.last_channel, 128),
            nn.ReLU(),
            nn.Dropout(0.6),
            nn.Linear(128, 2)
        )

    def forward(self, x):
        return self.model(x)

def load_model():
    model = MobileNetDeepfake()
    checkpoint = torch.load(
        "model/best_deepfake_model.pth",
        map_location=DEVICE
    )
    model.load_state_dict(checkpoint["model_state_dict"])
    model.to(DEVICE)
    return model
