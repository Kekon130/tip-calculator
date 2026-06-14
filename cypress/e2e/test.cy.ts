describe('Tip Calculator', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('shows the app title', () => {
		cy.contains('ion-title', 'Tip Calculator App');
	});

	it('calculates the amount per person', () => {
		// 100 de cuenta, 4 comensales, 15% propina => 115 / 4 = 28.75
		cy.get('ion-input[type="number"]').first().find('input').type('100');
		cy.get('ion-input[type="number"]').eq(1).find('input').clear().type('4');

		cy.contains('Total con propina: $115.00');
		cy.contains('Cada persona paga: $28.75');
	});

	it('updates when choosing a preset tip', () => {
		cy.get('ion-input[type="number"]').first().find('input').type('200');
		cy.get('ion-input[type="number"]').eq(1).find('input').clear().type('2');

		cy.contains('ion-segment-button', '20%').click();

		// 200 * 1.20 = 240 / 2 = 120
		cy.contains('Cada persona paga: $120.00');
	});
});
