export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Detection {
  id: string;
  type: string;
  label: string;
  confidence: number;
  timestamp: string;
  location: string;
  risk: RiskLevel;
  status: 'Active' | 'Resolved' | 'False Positive';
  imageUrl?: string;
  coordinates?: [number, number];
}

export interface Zone {
  lat: number;
  lng: number;
  level: 'low' | 'medium' | 'high';
  radius: number;
  label: string;
}

export interface Stats {
  activeCameras: number;
  detectionsToday: number;
  criticalAlerts: number;
  protectedSpeciesCovered: number;
}

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  type: 'danger' | 'warning' | 'info';
  timestamp: string;
  read: boolean;
}
