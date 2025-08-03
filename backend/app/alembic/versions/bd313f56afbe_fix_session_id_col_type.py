"""Fix session id col type and make it auto-incrementing

Revision ID: bd313f56afbe
Revises: 9c59201a7e8c
Create Date: 2025-08-03 13:23:10.744021
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'bd313f56afbe'
down_revision = '9c59201a7e8c'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # 1. Drop foreign key constraint
    op.drop_constraint('availabilities_session_id_fkey', 'availabilities', type_='foreignkey')

    # 2. Convert both columns to INTEGER
    op.execute("""
        ALTER TABLE sessions
        ALTER COLUMN id DROP DEFAULT,
        ALTER COLUMN id TYPE INTEGER USING id::INTEGER
    """)
    op.execute("""
        ALTER TABLE availabilities
        ALTER COLUMN session_id TYPE INTEGER USING session_id::INTEGER
    """)

    # 3. Make sessions.id auto-incrementing (IDENTITY column)
    op.execute("""
        ALTER TABLE sessions
        ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY
    """)

    # 4. Re-add the foreign key constraint
    op.create_foreign_key(
        'availabilities_session_id_fkey',
        'availabilities',
        'sessions',
        ['session_id'],
        ['id'],
        ondelete='CASCADE'
    )


def downgrade() -> None:
    # 1. Drop the foreign key constraint
    op.drop_constraint('availabilities_session_id_fkey', 'availabilities', type_='foreignkey')

    # 2. Revert both columns to VARCHAR
    op.execute("""
        ALTER TABLE availabilities
        ALTER COLUMN session_id TYPE VARCHAR USING session_id::VARCHAR
    """)
    op.execute("""
        ALTER TABLE sessions
        ALTER COLUMN id DROP IDENTITY IF EXISTS,
        ALTER COLUMN id TYPE VARCHAR USING id::VARCHAR
    """)

    # 3. Re-add the original foreign key constraint
    op.create_foreign_key(
        'availabilities_session_id_fkey',
        'availabilities',
        'sessions',
        ['session_id'],
        ['id'],
        ondelete='CASCADE'
    )
