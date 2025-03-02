"""create borrower employment details

Revision ID: 90d25ed3da6e
Revises: 4b9c4b77a832
Create Date: 2025-03-01 20:34:38.684735

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '90d25ed3da6e'
down_revision: Union[str, None] = '4b9c4b77a832'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table("employment_details", sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True, nullable=False, unique=True),
                    sa.Column("borrower_id", sa.Integer(), sa.ForeignKey("borrowers.id", ondelete="CASCADE", onupdate="NO ACTION"), nullable=False, unique=True),
                    sa.Column("status", sa.Boolean(), default="True"),
                    sa.Column("company", sa.String(), nullable=False),
                    sa.Column("job_title",  sa.String(), nullable=False),
                    sa.Column("salary_annual", sa.Integer(), nullable=False),
                    sa.Column("address", sa.JSON())
                    )


def downgrade() -> None:
    op.drop_table("employment_details")
