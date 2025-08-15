"""Add sessions.session_uuid (unique, non-null)

Revision ID: 422937fb7cac
Revises: bd313f56afbe
Create Date: 2025-08-14 19:37:21.246077

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '422937fb7cac'
down_revision: Union[str, Sequence[str], None] = 'bd313f56afbe'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add session_uuid as a unique, non-null column on sessions.
    op.add_column('sessions', sa.Column('session_uuid', sa.String(), nullable=False))
    op.create_unique_constraint('uq_sessions_session_uuid', 'sessions', ['session_uuid'])


def downgrade() -> None:
    """Downgrade schema."""
    # Drop the unique constraint and the session_uuid column.
    op.drop_constraint('uq_sessions_session_uuid', 'sessions', type_='unique')
    op.drop_column('sessions', 'session_uuid')
