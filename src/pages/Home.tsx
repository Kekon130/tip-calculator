import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonPage,
	IonRange,
	IonSegment,
	IonSegmentButton,
	IonText,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import './Home.css';
import { useState } from 'react';

const TIP_PRESETS = [15, 20, 25];

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

const Home: React.FC = () => {
	const [total, setTotal] = useState<number>(0);
	const [people, setPeople] = useState<number>(1);
	const [tip, setTip] = useState<number>(15);

	const tipAmount = (total * tip) / 100;
	const totalWithTip = total + tipAmount;
	// Evita NaN/Infinity cuando aún no hay comensales válidos
	const perPerson = people > 0 ? totalWithTip / people : 0;

	// El segmento activo se deriva del valor actual de la propina
	const activeSegment = TIP_PRESETS.includes(tip) ? String(tip) : 'custom';

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Tip Calculator App</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Datos de la Cuenta</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<IonItem>
							<IonLabel position="stacked">Importe total de la cuenta ($)</IonLabel>
							<IonInput
								type="number"
								min={0}
								value={total}
								placeholder="0.00"
								onIonInput={(e) =>
									setTotal(Math.max(0, Number(e.detail.value) || 0))
								}
							/>
						</IonItem>
						<IonItem>
							<IonLabel position="stacked">Número de comensales</IonLabel>
							<IonInput
								type="number"
								min={1}
								step="1"
								value={people}
								placeholder="Ej: 4"
								onIonInput={(e) =>
									setPeople(Math.max(1, Math.floor(Number(e.detail.value) || 1)))
								}
							/>
						</IonItem>
					</IonCardContent>
				</IonCard>

				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Propina</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<IonSegment
							value={activeSegment}
							onIonChange={(e) => {
								const value = e.detail.value;
								if (value && value !== 'custom') {
									setTip(Number(value));
								}
							}}
						>
							{TIP_PRESETS.map((preset) => (
								<IonSegmentButton key={preset} value={String(preset)}>
									<IonLabel>{preset}%</IonLabel>
								</IonSegmentButton>
							))}
							<IonSegmentButton value="custom">
								<IonLabel>Personalizado</IonLabel>
							</IonSegmentButton>
						</IonSegment>

						<IonText>
							<h2 className="tip-value">Propina: {tip}%</h2>
						</IonText>

						<IonRange
							min={0}
							max={100}
							step={1}
							value={tip}
							onIonInput={(e) => setTip(Number(e.detail.value))}
						/>
					</IonCardContent>
				</IonCard>

				<IonCard color="light">
					<IonCardHeader>
						<IonCardTitle>Resultado</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<IonText>
							<p>Propina: {formatCurrency(tipAmount)}</p>
						</IonText>
						<IonText>
							<h2>Total con propina: {formatCurrency(totalWithTip)}</h2>
						</IonText>
						<IonText>
							<h1 className="per-person">
								Cada persona paga: {formatCurrency(perPerson)}
							</h1>
						</IonText>
					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Home;
