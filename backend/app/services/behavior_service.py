from app.models.behavior import Behavior
from app.models.trade import Trade


class BehaviorService:

    @staticmethod
    def analyze(trades: list[Trade]) -> list[Behavior]:
        behaviors = []

        print("Checking behavior...")

        revenge_count = 0

        for i in range(1, len(trades)):
            previous = trades[i - 1]
            current = trades[i]

            if previous.pnl < 0 and current.quantity > previous.quantity:
                revenge_count += 1
                print("Revenge trade detected!")

        print(f"Total revenge count = {revenge_count}")

        if revenge_count >= 3:
            behaviors.append(
                Behavior(
                    name="Revenge Trading",
                    severity="High",
                    description=f"You increased position size after a losing trade {revenge_count} times."
                )
            )

        return behaviors